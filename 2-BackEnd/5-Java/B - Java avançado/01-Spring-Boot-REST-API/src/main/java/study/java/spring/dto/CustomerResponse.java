package study.java.spring.dto;

import java.time.LocalDateTime;

public class CustomerResponse {

  private final Long id;
  private final String name;
  private final String email;
  private final String company;
  private final LocalDateTime createdAt;
  private final int openTickets;

  public CustomerResponse(
      Long id,
      String name,
      String email,
      String company,
      LocalDateTime createdAt,
      int openTickets) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.company = company;
    this.createdAt = createdAt;
    this.openTickets = openTickets;
  }

  public Long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public String getEmail() {
    return email;
  }

  public String getCompany() {
    return company;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public int getOpenTickets() {
    return openTickets;
  }
}
