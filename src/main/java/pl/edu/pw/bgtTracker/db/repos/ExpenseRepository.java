package pl.edu.pw.bgtTracker.db.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.pw.bgtTracker.db.entities.AppUser;
import pl.edu.pw.bgtTracker.db.entities.Expense;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Collection;
import java.util.List;

@RepositoryRestResource(exported = false)
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    List<Expense> findByUser(AppUser user);

    @Query("select e from Expense e where e.user.email = :#{authentication.name}")
    List<Expense> findAll();
    //Collection<Income> getAllIncomes();
}

// import org.springframework.data.jpa.repository.Query;
// import org.springframework.data.repository.PagingAndSortingRepository;
// import org.springframework.data.rest.core.annotation.RepositoryRestResource;
// import pl.edu.pw.bgtTracker.db.entities.Expense;

// @RepositoryRestResource(exported = false)
// public interface ExpenseRepository extends PagingAndSortingRepository<Expense, Long> {
//     @Query("select e from Expense e where e.user.email = :#{authentication.name}")
//     Iterable<Expense> findAll();
//}