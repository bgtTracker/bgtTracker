package pl.edu.pw.bgtTracker.db;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.pw.bgtTracker.db.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {}
