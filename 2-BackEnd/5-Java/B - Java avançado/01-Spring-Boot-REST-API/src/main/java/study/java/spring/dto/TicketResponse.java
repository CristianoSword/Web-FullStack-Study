package study.java.spring.dto;

import java.time.LocalDateTime;
import study.java.spring.domain.TicketPriority;
import study.java.spring.domain.TicketStatus;

public class TicketResponse {

  private final Long id;
  private final String title;
  private final String description;
  private final TicketPriority priority;
  private final TicketStatus status;
  private final String assignedTeam;
  private final Long customerId;
  private final String customerName;
  private final LocalDateTime createdAt;
  private final LocalDateTime updatedAt;

  public TicketResponse(
      Long id,
      String title,
      String description,
      TicketPriority priority,
      TicketStatus status,
      String assignedTeam,
      Long customerId,
      String customerName,
      LocalDateTime createdAt,
      LocalDateTime updatedAt) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.status = status;
    this.assignedTeam = assignedTeam;
    this.customerId = customerId;
    this.customerName = customerName;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public Long getId() {
    return id;
  }

  public String getTitle() {
    return title;
  }

  public String getDescription() {
    return description;
  }

  public TicketPriority getPriority() {
    return priority;
  }

  public TicketStatus getStatus() {
    return status;
  }

  public String getAssignedTeam() {
    return assignedTeam;
  }

  public Long getCustomerId() {
    return customerId;
  }

  public String getCustomerName() {
    return customerName;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public LocalDateTime getUpdatedAt() {
    return updatedAt;
  }
}
