package study.java.spring;

public class Main {
  public static void main(String[] args) {
    Customer sample = new CustomerService().list().get(0);
    if (!new CustomerValidator().isValid(sample)) {
      throw new IllegalStateException("invalid customer");
    }

    System.out.println(new CustomerController().firstCustomer().name());
  }
}
