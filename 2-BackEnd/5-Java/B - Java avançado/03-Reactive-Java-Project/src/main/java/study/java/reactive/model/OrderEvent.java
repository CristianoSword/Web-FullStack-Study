package study.java.reactive.model;

import java.time.Instant;

public class OrderEvent {

  private final String orderId;
  private final String customerTier;
  private final int quantity;
  private final double unitPrice;
  private final boolean paymentConfirmed;
  private final Instant receivedAt;

  public OrderEvent(
      String orderId,
      String customerTier,
      int quantity,
      double unitPrice,
      boolean paymentConfirmed,
      Instant receivedAt) {
    this.orderId = orderId;
    this.customerTier = customerTier;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.paymentConfirmed = paymentConfirmed;
    this.receivedAt = receivedAt;
  }

  public String getOrderId() {
    return orderId;
  }

  public String getCustomerTier() {
    return customerTier;
  }

  public int getQuantity() {
    return quantity;
  }

  public double getUnitPrice() {
    return unitPrice;
  }

  public boolean isPaymentConfirmed() {
    return paymentConfirmed;
  }

  public Instant getReceivedAt() {
    return receivedAt;
  }
}
