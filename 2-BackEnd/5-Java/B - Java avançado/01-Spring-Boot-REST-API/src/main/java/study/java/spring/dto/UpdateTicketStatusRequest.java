package study.java.spring.dto;

import javax.validation.constraints.NotNull;
import study.java.spring.domain.TicketStatus;

public class UpdateTicketStatusRequest {

  @NotNull
  private TicketStatus status;

  public TicketStatus getStatus() {
    return status;
  }

  public void setStatus(TicketStatus status) {
    this.status = status;
  }
}
