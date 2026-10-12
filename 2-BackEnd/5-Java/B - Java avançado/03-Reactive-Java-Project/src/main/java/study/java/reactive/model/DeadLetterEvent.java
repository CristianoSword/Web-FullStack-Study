package study.java.reactive.model;

import java.time.Instant;

public class DeadLetterEvent {

  private final String orderId;
  private final String reason;
  private final Instant failedAt;

  public DeadLetterEvent(String orderId, String reason, Instant failedAt) {
    this.orderId = orderId;
    this.reason = reason;
    this.failedAt = failedAt;
  }

  public String getOrderId() {
    return orderId;
  }

  public String getReason() {
    return reason;
  }

  public Instant getFailedAt() {
    return failedAt;
  }
}
