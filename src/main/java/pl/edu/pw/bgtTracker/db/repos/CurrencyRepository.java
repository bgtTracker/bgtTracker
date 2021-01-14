package pl.edu.pw.bgtTracker.db.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import pl.edu.pw.bgtTracker.db.entities.Currency;

public interface CurrencyRepository extends JpaRepository<Currency, Long> {
  
}
