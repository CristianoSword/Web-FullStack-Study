package study.java.spring.service;

import org.springframework.stereotype.Component;
import study.java.spring.domain.SupportTicketEntity;
import study.java.spring.dto.TicketResponse;

@Component
public class TicketMapper {

  public TicketResponse toResponse(SupportTicketEntity ticket) {
    return new TicketResponse(
        ticket.getId(),
        ticket.getTitle(),
        ticket.getDescription(),
        ticket.getPriority(),
        ticket.getStatus(),
        ticket.getAssignedTeam(),
        ticket.getCustomer().getId(),
        ticket.getCustomer().getName(),
        ticket.getCreatedAt(),
        ticket.getUpdatedAt());
  }
}
