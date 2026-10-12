package study.java.spring.service;

import java.util.Arrays;
import org.springframework.stereotype.Component;
import study.java.spring.domain.CustomerEntity;
import study.java.spring.domain.TicketStatus;
import study.java.spring.dto.CustomerResponse;
import study.java.spring.repository.SupportTicketRepository;

@Component
public class CustomerMapper {

  private final SupportTicketRepository ticketRepository;

  public CustomerMapper(SupportTicketRepository ticketRepository) {
    this.ticketRepository = ticketRepository;
  }

  public CustomerResponse toResponse(CustomerEntity customer) {
    long openTickets = ticketRepository.countByCustomerIdAndStatusIn(
        customer.getId(),
        Arrays.asList(TicketStatus.OPEN, TicketStatus.IN_PROGRESS, TicketStatus.WAITING_CUSTOMER));

    return new CustomerResponse(
        customer.getId(),
        customer.getName(),
        customer.getEmail(),
        customer.getCompany(),
        customer.getCreatedAt(),
        (int) openTickets);
  }
}
