package study.java.reactive.service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Sinks;
import study.java.reactive.model.DeadLetterEvent;
import study.java.reactive.model.EnrichedOrder;
import study.java.reactive.model.OrderCommand;
import study.java.reactive.model.OrderEvent;
import study.java.reactive.model.PipelineReport;

public class ReactiveFulfillmentPipeline {

  private final EventValidator eventValidator;
  private final InventoryGateway inventoryGateway;
  private final PricingGateway pricingGateway;
  private final DeadLetterStore deadLetterStore;

  public ReactiveFulfillmentPipeline() {
    this(new EventValidator(), new InventoryGateway(), new PricingGateway(), new DeadLetterStore());
  }

  public ReactiveFulfillmentPipeline(
      EventValidator eventValidator,
      InventoryGateway inventoryGateway,
      PricingGateway pricingGateway,
      DeadLetterStore deadLetterStore) {
    this.eventValidator = eventValidator;
    this.inventoryGateway = inventoryGateway;
    this.pricingGateway = pricingGateway;
    this.deadLetterStore = deadLetterStore;
  }

  public Mono<PipelineReport> processBatch(List<OrderCommand> commands) {
    List<EnrichedOrder> processed = new ArrayList<EnrichedOrder>();
    Sinks.Many<OrderCommand> inboundOrders = Sinks.many().unicast().onBackpressureBuffer();

    Flux<EnrichedOrder> pipeline = inboundOrders.asFlux()
        .flatMap(this::validateAndEnrich)
        .doOnNext(processed::add);

    Mono<PipelineReport> reportMono = pipeline.then(Mono.fromSupplier(
        () -> new PipelineReport(processed, deadLetterStore.snapshot())));

    for (OrderCommand command : commands) {
      inboundOrders.emitNext(command, Sinks.EmitFailureHandler.FAIL_FAST);
    }
    inboundOrders.emitComplete(Sinks.EmitFailureHandler.FAIL_FAST);

    return reportMono;
  }

  private Mono<EnrichedOrder> validateAndEnrich(OrderCommand command) {
    return eventValidator.validate(command)
        .flatMap(this::reserveInventoryAndPrice)
        .onErrorResume(error -> {
          deadLetterStore.save(new DeadLetterEvent(
              command.getOrderId(),
              error.getMessage(),
              Instant.now()));
          return Mono.empty();
        });
  }

  private Mono<EnrichedOrder> reserveInventoryAndPrice(OrderEvent event) {
    return inventoryGateway.reserve(event.getOrderId(), event.getQuantity())
        .flatMap(reservationId -> pricingGateway.price(event, reservationId));
  }
}
