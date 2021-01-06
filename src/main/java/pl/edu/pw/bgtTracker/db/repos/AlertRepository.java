package pl.edu.pw.bgtTracker.db.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.pw.bgtTracker.db.entities.Alert;
import pl.edu.pw.bgtTracker.db.entities.AppUser;

public interface AlertRepository extends JpaRepository<Alert, Long> {
    List<Alert> findByUser(AppUser user);
}
