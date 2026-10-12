package study.java.reactive.model;

public class OrderCommand {

  private final String orderId;
  private final String customerTier;
  private final int quantity;
  private final double unitPrice;
  private final boolean paymentConfirmed;

  public OrderCommand(
      String orderId,
      String customerTier,
      int quantity,
      double unitPrice,
      boolean paymentConfirmed) {
    this.orderId = orderId;
    this.customerTier = customerTier;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.paymentConfirmed = paymentConfirmed;
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
}
