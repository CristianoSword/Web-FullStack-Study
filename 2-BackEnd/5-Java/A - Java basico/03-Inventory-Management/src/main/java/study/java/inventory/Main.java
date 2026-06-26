package study.java.inventory;

public class Main {
  public static void main(String[] args) {
    InventoryService service = new InventoryService();
    InventoryValidator validator = new InventoryValidator();
    if (!validator.isValid(service.list().get(0))) {
      throw new IllegalStateException("invalid stock item");
    }

    System.out.println(service.list().size());
  }
}
