package study.java.spring.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import study.java.spring.domain.TicketPriority;

public class CreateTicketRequest {

  @NotBlank
  @Size(max = 160)
  private String title;

  @NotBlank
  @Size(max = 2000)
  private String description;

  @NotNull
  private TicketPriority priority;

  @NotBlank
  @Size(max = 120)
  private String assignedTeam;

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public TicketPriority getPriority() {
    return priority;
  }

  public void setPriority(TicketPriority priority) {
    this.priority = priority;
  }

  public String getAssignedTeam() {
    return assignedTeam;
  }

  public void setAssignedTeam(String assignedTeam) {
    this.assignedTeam = assignedTeam;
  }
}
