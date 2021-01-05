package pl.edu.pw.bgtTracker.db.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import pl.edu.pw.bgtTracker.db.entities.AppUser;
import pl.edu.pw.bgtTracker.db.entities.Objective;

public interface ObjectiveRepository extends JpaRepository<Objective, Long>
{
   List<Objective> findByUser(AppUser user);
}
