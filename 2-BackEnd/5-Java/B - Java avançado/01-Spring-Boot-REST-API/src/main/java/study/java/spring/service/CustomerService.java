package study.java.spring.service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import study.java.spring.domain.CustomerEntity;
import study.java.spring.dto.CreateCustomerRequest;
import study.java.spring.dto.CustomerResponse;
import study.java.spring.exception.BusinessRuleException;
import study.java.spring.exception.ResourceNotFoundException;
import study.java.spring.repository.CustomerRepository;

@Service
public class CustomerService {

  private final CustomerRepository customerRepository;
  private final CustomerMapper customerMapper;

  public CustomerService(CustomerRepository customerRepository, CustomerMapper customerMapper) {
    this.customerRepository = customerRepository;
    this.customerMapper = customerMapper;
  }

  @Transactional(readOnly = true)
  public List<CustomerResponse> listCustomers() {
    return customerRepository.findAll().stream()
        .map(customerMapper::toResponse)
        .collect(Collectors.toList());
  }

  @Transactional(readOnly = true)
  public CustomerResponse getCustomer(Long customerId) {
    return customerMapper.toResponse(findCustomerEntity(customerId));
  }

  @Transactional
  public CustomerResponse createCustomer(CreateCustomerRequest request) {
    customerRepository.findByEmailIgnoreCase(request.getEmail())
        .ifPresent(existing -> {
          throw new BusinessRuleException("Customer email already registered: " + existing.getEmail());
        });

    CustomerEntity customer = new CustomerEntity();
    customer.setName(request.getName().trim());
    customer.setEmail(request.getEmail().trim().toLowerCase());
    customer.setCompany(request.getCompany().trim());

    return customerMapper.toResponse(customerRepository.save(customer));
  }

  @Transactional(readOnly = true)
  public CustomerEntity findCustomerEntity(Long customerId) {
    return customerRepository.findById(customerId)
        .orElseThrow(() -> new ResourceNotFoundException("Customer not found: " + customerId));
  }
}
