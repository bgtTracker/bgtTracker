package pl.edu.pw.bgtTracker.db;

import org.springframework.data.repository.CrudRepository;
import pl.edu.pw.bgtTracker.db.entities.User;

public interface UserRepository extends CrudRepository<User, Long> {}
