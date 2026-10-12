package study.java.reactive.service;

import java.time.Duration;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;
import study.java.reactive.model.EnrichedOrder;
import study.java.reactive.model.OrderEvent;

public class PricingGateway {

  public Mono<EnrichedOrder> price(OrderEvent event, String reservationId) {
    return Mono.delay(Duration.ofMillis(30))
        .publishOn(Schedulers.parallel())
        .map(ignored -> {
          double subtotal = event.getQuantity() * event.getUnitPrice();
          double discountRate = resolveDiscount(event.getCustomerTier(), event.getQuantity());
          double finalAmount = subtotal - (subtotal * discountRate);

          return new EnrichedOrder(
              event.getOrderId(),
              event.getCustomerTier(),
              event.getQuantity(),
              event.isPaymentConfirmed(),
              subtotal,
              discountRate,
              finalAmount,
              reservationId,
              event.getReceivedAt());
        });
  }

  private double resolveDiscount(String tier, int quantity) {
    double tierDiscount;
    if ("enterprise".equals(tier)) {
      tierDiscount = 0.15;
    } else if ("pro".equals(tier)) {
      tierDiscount = 0.08;
    } else {
      tierDiscount = 0.03;
    }

    return quantity >= 10 ? tierDiscount + 0.02 : tierDiscount;
  }
}
