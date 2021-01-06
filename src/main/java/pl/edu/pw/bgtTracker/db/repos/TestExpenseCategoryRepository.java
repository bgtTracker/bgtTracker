package pl.edu.pw.bgtTracker.db.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import pl.edu.pw.bgtTracker.db.entities.ExpenseCategory;

public interface TestExpenseCategoryRepository extends JpaRepository<ExpenseCategory, Long> 
{
  
}
