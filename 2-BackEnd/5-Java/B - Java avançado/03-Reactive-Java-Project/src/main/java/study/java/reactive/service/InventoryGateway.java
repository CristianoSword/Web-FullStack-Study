package study.java.reactive.service;

import java.time.Duration;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

public class InventoryGateway {

  public Mono<String> reserve(String orderId, int quantity) {
    return Mono.delay(Duration.ofMillis(40))
        .publishOn(Schedulers.parallel())
        .map(ignored -> "RES-" + orderId + "-" + quantity);
  }
}
