package pl.edu.pw.bgtTracker.db.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.pw.bgtTracker.db.entities.IncomeCategory;
import pl.edu.pw.bgtTracker.db.entities.AppUser;

import java.util.Collection;
import java.util.List;

public interface IncomeCategoryRepository extends JpaRepository<IncomeCategory, Long> {
    //List<IncomeCategory> findById(long id);
    IncomeCategory findById(long id);
    //List<IncomeCategory> findByUserId(long id);
}