package study.java.spring;

import java.util.List;

public class CustomerService {
  public List<Customer> list() {
    return List.of(new Customer(1L, "Maria"));
  }
}
