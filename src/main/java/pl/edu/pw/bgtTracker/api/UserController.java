package pl.edu.pw.bgtTracker.api;

import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import pl.edu.pw.bgtTracker.db.repos.UserRepository;

@Data
@AllArgsConstructor
@NoArgsConstructor
class OldNewPassword {
    private String oldPassword;
    private String newPassword;
}

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired private UserRepository repository;
    @Autowired private BCryptPasswordEncoder encoder;

    @GetMapping("/first-name")
    public String getFirstName(Authentication auth) {
        return repository.findByEmail(auth.getName()).getFirstName();
    }

    @PostMapping("/first-name")
    public void setFirstName(Authentication auth, @RequestBody String newFirstName) {
        var user = repository.findByEmail(auth.getName());
        user.setFirstName(newFirstName);
        repository.save(user);
    }

    @GetMapping("/last-name")
    public String getLastName(Authentication auth) {
        return repository.findByEmail(auth.getName()).getLastName();
    }

    @PostMapping("/last-name")
    public void setLastName(Authentication auth, @RequestBody String newLastName) {
        var user = repository.findByEmail(auth.getName());
        user.setLastName(newLastName);
        repository.save(user);
    }

    @PostMapping("/password")
    public boolean setPassword(Authentication auth, @RequestBody OldNewPassword oldNewPassword) {
        var user = repository.findByEmail(auth.getName());
        if (user.getPassword().equals(encoder.encode(oldNewPassword.getOldPassword()))) {
            user.setPassword(encoder.encode(oldNewPassword.getNewPassword()));
            repository.save(user);
            return true;
        }
        return false;
    }
}
