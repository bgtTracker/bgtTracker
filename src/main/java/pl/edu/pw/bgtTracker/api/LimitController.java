package pl.edu.pw.bgtTracker.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pl.edu.pw.bgtTracker.db.entities.AppUser;
import pl.edu.pw.bgtTracker.db.entities.Expense;
import pl.edu.pw.bgtTracker.db.entities.Income;
import pl.edu.pw.bgtTracker.db.repos.UserRepository;

@RestController
public class LimitController {
  
  @Autowired private UserRepository userRepository;
  
  @GetMapping("/api/limit")
  public Long getLimit(Authentication auth)
  {
    AppUser user = userRepository.findByEmail(auth.getName());

    return user.getUserLimit();
  }

  @PutMapping("/api/limit")
  public void setLimit(Authentication auth, @RequestBody String newLimit)
  {
    AppUser user = userRepository.findByEmail(auth.getName());

    Long limit = Long.parseLong(newLimit);
    user.setUserLimit(limit);
    userRepository.save(user);
  }
  
}
