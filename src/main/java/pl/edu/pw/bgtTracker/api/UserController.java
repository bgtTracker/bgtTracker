package pl.edu.pw.bgtTracker.api;

import lombok.*;

import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import pl.edu.pw.bgtTracker.api.notifications.NotificationsService;
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
    @Autowired private NotificationsService notificationsService;

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
    public boolean setPassword(Authentication auth, @RequestBody OldNewPassword oldNewPassword) throws InterruptedException, ExecutionException{
        var user = repository.findByEmail(auth.getName());
        if (encoder.matches(oldNewPassword.getOldPassword(), user.getPassword())) {
            user.setPassword(encoder.encode(oldNewPassword.getNewPassword()));
            repository.save(user);
            try {
                notificationsService.sendSuccess(user.getId(), "Password changed successfully", "Password Change");
            }
            catch(InterruptedException | ExecutionException e) {
                return false;
            }
            return true;
        }
        notificationsService.sendError(user.getId(), "Wrong old password", "Password Change");
        return false;
        
    }
}
