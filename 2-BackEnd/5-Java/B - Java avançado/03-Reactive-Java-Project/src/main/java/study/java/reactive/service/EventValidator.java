package study.java.reactive.service;

import java.time.Instant;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;
import study.java.reactive.model.OrderCommand;
import study.java.reactive.model.OrderEvent;

public class EventValidator {

  public Mono<OrderEvent> validate(OrderCommand command) {
    return Mono.fromCallable(() -> {
          if (command.getOrderId() == null || command.getOrderId().trim().isEmpty()) {
            throw new IllegalArgumentException("orderId is required");
          }
          if (command.getQuantity() <= 0) {
            throw new IllegalArgumentException("quantity must be positive");
          }
          if (command.getUnitPrice() <= 0) {
            throw new IllegalArgumentException("unitPrice must be positive");
          }
          if (!command.isPaymentConfirmed()) {
            throw new IllegalStateException("payment must be confirmed before fulfillment");
          }

          return new OrderEvent(
              command.getOrderId().trim(),
              command.getCustomerTier() == null ? "standard" : command.getCustomerTier().trim().toLowerCase(),
              command.getQuantity(),
              command.getUnitPrice(),
              command.isPaymentConfirmed(),
              Instant.now());
        })
        .subscribeOn(Schedulers.parallel());
  }
}
