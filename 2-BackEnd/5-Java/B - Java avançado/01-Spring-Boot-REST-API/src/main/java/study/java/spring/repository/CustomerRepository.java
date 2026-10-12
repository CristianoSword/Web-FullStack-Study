package study.java.spring.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import study.java.spring.domain.CustomerEntity;

public interface CustomerRepository extends JpaRepository<CustomerEntity, Long> {

  Optional<CustomerEntity> findByEmailIgnoreCase(String email);
}
