package study.java.spring.service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import study.java.spring.domain.CustomerEntity;
import study.java.spring.domain.SupportTicketEntity;
import study.java.spring.domain.TicketStatus;
import study.java.spring.dto.CreateTicketRequest;
import study.java.spring.dto.TicketResponse;
import study.java.spring.exception.BusinessRuleException;
import study.java.spring.exception.ResourceNotFoundException;
import study.java.spring.repository.SupportTicketRepository;

@Service
public class TicketService {

  private final SupportTicketRepository ticketRepository;
  private final CustomerService customerService;
  private final TicketMapper ticketMapper;

  public TicketService(
      SupportTicketRepository ticketRepository,
      CustomerService customerService,
      TicketMapper ticketMapper) {
    this.ticketRepository = ticketRepository;
    this.customerService = customerService;
    this.ticketMapper = ticketMapper;
  }

  @Transactional(readOnly = true)
  public List<TicketResponse> listAllTickets() {
    return ticketRepository.findAll().stream()
        .sorted(Comparator.comparing(SupportTicketEntity::getCreatedAt).reversed())
        .map(ticketMapper::toResponse)
        .collect(Collectors.toList());
  }

  @Transactional(readOnly = true)
  public List<TicketResponse> listTicketsByCustomer(Long customerId) {
    customerService.findCustomerEntity(customerId);
    return ticketRepository.findByCustomerIdOrderByCreatedAtDesc(customerId).stream()
        .map(ticketMapper::toResponse)
        .collect(Collectors.toList());
  }

  @Transactional(readOnly = true)
  public TicketResponse getTicket(Long ticketId) {
    return ticketMapper.toResponse(findTicketEntity(ticketId));
  }

  @Transactional
  public TicketResponse createTicket(Long customerId, CreateTicketRequest request) {
    CustomerEntity customer = customerService.findCustomerEntity(customerId);
    SupportTicketEntity ticket = new SupportTicketEntity();
    ticket.setCustomer(customer);
    ticket.setTitle(request.getTitle().trim());
    ticket.setDescription(request.getDescription().trim());
    ticket.setPriority(request.getPriority());
    ticket.setAssignedTeam(request.getAssignedTeam().trim());
    ticket.setStatus(TicketStatus.OPEN);

    return ticketMapper.toResponse(ticketRepository.save(ticket));
  }

  @Transactional
  public TicketResponse updateStatus(Long ticketId, TicketStatus status) {
    SupportTicketEntity ticket = findTicketEntity(ticketId);

    if (ticket.getStatus() == TicketStatus.RESOLVED && status != TicketStatus.RESOLVED) {
      throw new BusinessRuleException("Resolved ticket cannot return to an active state.");
    }

    ticket.setStatus(status);
    return ticketMapper.toResponse(ticketRepository.save(ticket));
  }

  @Transactional(readOnly = true)
  public SupportTicketEntity findTicketEntity(Long ticketId) {
    return ticketRepository.findById(ticketId)
        .orElseThrow(() -> new ResourceNotFoundException("Ticket not found: " + ticketId));
  }
}
