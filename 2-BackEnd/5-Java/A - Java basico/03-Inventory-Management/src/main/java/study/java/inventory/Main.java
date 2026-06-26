package study.java.inventory;

public class Main {
  public static void main(String[] args) {
    InventoryService service = new InventoryService();
    System.out.println(service.list().size());
  }
}
