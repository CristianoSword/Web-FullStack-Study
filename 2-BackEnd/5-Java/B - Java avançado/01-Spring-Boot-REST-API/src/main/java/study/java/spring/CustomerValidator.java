package study.java.spring;

public class CustomerValidator {
  public boolean isValid(Customer customer) {
    return customer.name() != null && !customer.name().isBlank();
  }
}
