package pl.edu.pw.bgtTracker.db.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.pw.bgtTracker.db.entities.ExpenseCategory;
import pl.edu.pw.bgtTracker.db.entities.AppUser;

import java.util.Collection;
import java.util.List;

public interface ExpenseCategoryRepository extends JpaRepository<ExpenseCategory, Long> {
    List<ExpenseCategory> findByUserId(long id);
    ExpenseCategory findById(long id);
    List<ExpenseCategory> findByUser(AppUser user);

    /* */
    
}