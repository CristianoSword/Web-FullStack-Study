package study.java.spring;

public class CustomerController {
  public CustomerResponse firstCustomer() {
    return new CustomerResponse(new CustomerService().list().get(0).name());
  }
}
