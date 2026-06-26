package study.java.inventory;

import java.util.List;

public class InventoryService {
  public List<Product> list() {
    return List.of(new Product("Keyboard", 8), new Product("Mouse", 14));
  }
}
