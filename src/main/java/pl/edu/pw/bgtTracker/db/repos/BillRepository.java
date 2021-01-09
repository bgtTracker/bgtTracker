package pl.edu.pw.bgtTracker.db.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.pw.bgtTracker.db.entities.Bill;
import pl.edu.pw.bgtTracker.db.entities.AppUser;

import java.util.List;

public interface BillRepository extends JpaRepository<Bill, Long> {
    List<Bill> findByUser(AppUser user);
}
