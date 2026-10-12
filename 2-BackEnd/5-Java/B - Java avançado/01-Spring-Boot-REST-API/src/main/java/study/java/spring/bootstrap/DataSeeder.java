package study.java.spring.bootstrap;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import study.java.spring.domain.CustomerEntity;
import study.java.spring.domain.SupportTicketEntity;
import study.java.spring.domain.TicketPriority;
import study.java.spring.domain.TicketStatus;
import study.java.spring.repository.CustomerRepository;
import study.java.spring.repository.SupportTicketRepository;

@Component
public class DataSeeder implements CommandLineRunner {

  private final CustomerRepository customerRepository;
  private final SupportTicketRepository ticketRepository;

  public DataSeeder(
      CustomerRepository customerRepository,
      SupportTicketRepository ticketRepository) {
    this.customerRepository = customerRepository;
    this.ticketRepository = ticketRepository;
  }

  @Override
  public void run(String... args) {
    if (customerRepository.count() > 0) {
      return;
    }

    CustomerEntity acme = new CustomerEntity();
    acme.setName("Marina Costa");
    acme.setEmail("marina@acme.com");
    acme.setCompany("Acme Logistics");
    acme = customerRepository.save(acme);

    CustomerEntity orbit = new CustomerEntity();
    orbit.setName("Diego Ramos");
    orbit.setEmail("diego@orbit.io");
    orbit.setCompany("Orbit Commerce");
    orbit = customerRepository.save(orbit);

    ticketRepository.save(createTicket(
        acme,
        "Payment gateway timeout",
        "Timeouts started after yesterday deployment in the checkout service.",
        TicketPriority.CRITICAL,
        TicketStatus.IN_PROGRESS,
        "platform-core"));

    ticketRepository.save(createTicket(
        orbit,
        "Invoice export formatting bug",
        "CSV exports are missing timezone-aware created_at formatting.",
        TicketPriority.MEDIUM,
        TicketStatus.OPEN,
        "backoffice"));
  }

  private SupportTicketEntity createTicket(
      CustomerEntity customer,
      String title,
      String description,
      TicketPriority priority,
      TicketStatus status,
      String assignedTeam) {
    SupportTicketEntity ticket = new SupportTicketEntity();
    ticket.setCustomer(customer);
    ticket.setTitle(title);
    ticket.setDescription(description);
    ticket.setPriority(priority);
    ticket.setStatus(status);
    ticket.setAssignedTeam(assignedTeam);
    return ticket;
  }
}
