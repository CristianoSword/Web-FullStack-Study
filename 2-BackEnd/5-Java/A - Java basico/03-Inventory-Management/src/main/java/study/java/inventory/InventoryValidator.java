package study.java.inventory;

public class InventoryValidator {
  public boolean isValid(Product product) {
    return product.quantity() >= 0;
  }
}
