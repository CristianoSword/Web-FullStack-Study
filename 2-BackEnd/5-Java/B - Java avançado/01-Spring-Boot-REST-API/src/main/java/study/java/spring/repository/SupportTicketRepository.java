package study.java.spring.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import study.java.spring.domain.SupportTicketEntity;
import study.java.spring.domain.TicketStatus;

public interface SupportTicketRepository extends JpaRepository<SupportTicketEntity, Long> {

  List<SupportTicketEntity> findByCustomerIdOrderByCreatedAtDesc(Long customerId);

  long countByCustomerIdAndStatusIn(Long customerId, List<TicketStatus> statuses);
}
