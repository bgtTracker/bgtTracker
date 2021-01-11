package pl.edu.pw.bgtTracker.db.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import pl.edu.pw.bgtTracker.db.entities.Income;
import pl.edu.pw.bgtTracker.db.entities.AppUser;

import java.util.Collection;
import java.util.List;

public interface IncomeRepository extends JpaRepository<Income, Long> {
    List<Income> findByUser(AppUser user);
    List<Income> findByUserOrderByDateAsc(AppUser user);
    // @Query("select  * from expense e where user_id = :userID and \"date\" > ':startDate' and \"date\" < ':endDate'")
    // List<Income> findByUserBetweenDates(@Param("userID") Long userID, @Param("startDate") String startDate, @Param("endDate") String endDate);
    
    //Collection<Income> getAllIncomes();
}
