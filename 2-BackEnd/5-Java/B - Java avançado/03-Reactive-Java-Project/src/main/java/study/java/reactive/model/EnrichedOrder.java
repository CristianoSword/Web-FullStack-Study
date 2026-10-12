package study.java.reactive.model;

import java.time.Instant;

public class EnrichedOrder {

  private final String orderId;
  private final String customerTier;
  private final int quantity;
  private final boolean paymentConfirmed;
  private final double subtotal;
  private final double discountRate;
  private final double finalAmount;
  private final String reservationId;
  private final Instant processedAt;

  public EnrichedOrder(
      String orderId,
      String customerTier,
      int quantity,
      boolean paymentConfirmed,
      double subtotal,
      double discountRate,
      double finalAmount,
      String reservationId,
      Instant processedAt) {
    this.orderId = orderId;
    this.customerTier = customerTier;
    this.quantity = quantity;
    this.paymentConfirmed = paymentConfirmed;
    this.subtotal = subtotal;
    this.discountRate = discountRate;
    this.finalAmount = finalAmount;
    this.reservationId = reservationId;
    this.processedAt = processedAt;
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

  public boolean isPaymentConfirmed() {
    return paymentConfirmed;
  }

  public double getSubtotal() {
    return subtotal;
  }

  public double getDiscountRate() {
    return discountRate;
  }

  public double getFinalAmount() {
    return finalAmount;
  }

  public String getReservationId() {
    return reservationId;
  }

  public Instant getProcessedAt() {
    return processedAt;
  }
}
