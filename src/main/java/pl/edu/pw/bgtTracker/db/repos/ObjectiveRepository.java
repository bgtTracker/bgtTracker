package pl.edu.pw.bgtTracker.db.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import pl.edu.pw.bgtTracker.db.entities.Objective;

public interface ObjectiveRepository extends JpaRepository<Objective, Long>
{
  
}
