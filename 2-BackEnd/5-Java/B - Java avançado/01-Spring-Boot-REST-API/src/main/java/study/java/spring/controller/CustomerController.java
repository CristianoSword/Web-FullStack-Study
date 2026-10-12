package study.java.spring.controller;

import java.net.URI;
import java.util.List;
import javax.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import study.java.spring.dto.CreateCustomerRequest;
import study.java.spring.dto.CreateTicketRequest;
import study.java.spring.dto.CustomerResponse;
import study.java.spring.dto.TicketResponse;
import study.java.spring.service.CustomerService;
import study.java.spring.service.TicketService;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

  private final CustomerService customerService;
  private final TicketService ticketService;

  public CustomerController(CustomerService customerService, TicketService ticketService) {
    this.customerService = customerService;
    this.ticketService = ticketService;
  }

  @GetMapping
  public List<CustomerResponse> listCustomers() {
    return customerService.listCustomers();
  }

  @GetMapping("/{customerId}")
  public CustomerResponse getCustomer(@PathVariable Long customerId) {
    return customerService.getCustomer(customerId);
  }

  @PostMapping
  public ResponseEntity<CustomerResponse> createCustomer(
      @Valid @RequestBody CreateCustomerRequest request) {
    CustomerResponse created = customerService.createCustomer(request);
    URI location = ServletUriComponentsBuilder.fromCurrentRequest()
        .path("/{customerId}")
        .buildAndExpand(created.getId())
        .toUri();
    return ResponseEntity.created(location).body(created);
  }

  @GetMapping("/{customerId}/tickets")
  public List<TicketResponse> listCustomerTickets(@PathVariable Long customerId) {
    return ticketService.listTicketsByCustomer(customerId);
  }

  @PostMapping("/{customerId}/tickets")
  public ResponseEntity<TicketResponse> createTicket(
      @PathVariable Long customerId,
      @Valid @RequestBody CreateTicketRequest request) {
    TicketResponse created = ticketService.createTicket(customerId, request);
    URI location = ServletUriComponentsBuilder.fromCurrentRequest()
        .path("/{ticketId}")
        .buildAndExpand(created.getId())
        .toUri();
    return ResponseEntity.created(location).body(created);
  }
}
