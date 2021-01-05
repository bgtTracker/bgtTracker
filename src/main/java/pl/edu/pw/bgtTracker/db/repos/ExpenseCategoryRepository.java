package pl.edu.pw.bgtTracker.db.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import pl.edu.pw.bgtTracker.db.entities.ExpenseCategory;

public interface ExpenseCategoryRepository extends JpaRepository<ExpenseCategory, Long> 
{
  
}
