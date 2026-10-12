package study.java.spring.controller;

import java.util.List;
import javax.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import study.java.spring.dto.TicketResponse;
import study.java.spring.dto.UpdateTicketStatusRequest;
import study.java.spring.service.TicketService;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

  private final TicketService ticketService;

  public TicketController(TicketService ticketService) {
    this.ticketService = ticketService;
  }

  @GetMapping
  public List<TicketResponse> listTickets() {
    return ticketService.listAllTickets();
  }

  @GetMapping("/{ticketId}")
  public TicketResponse getTicket(@PathVariable Long ticketId) {
    return ticketService.getTicket(ticketId);
  }

  @PatchMapping("/{ticketId}/status")
  public TicketResponse updateStatus(
      @PathVariable Long ticketId,
      @Valid @RequestBody UpdateTicketStatusRequest request) {
    return ticketService.updateStatus(ticketId, request.getStatus());
  }
}
