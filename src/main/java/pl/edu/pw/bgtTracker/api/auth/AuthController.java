package pl.edu.pw.bgtTracker.api.auth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import pl.edu.pw.bgtTracker.db.entities.AppUser;
import pl.edu.pw.bgtTracker.db.repos.UserRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private UserRepository repository;
    private BCryptPasswordEncoder encoder;

    public AuthController(UserRepository repository, BCryptPasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody AppUser user) {
        if (repository.findByEmail(user.getEmail()) != null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User already exists");
        user.setPassword(encoder.encode(user.getPassword()));
        repository.save(user);
        return ResponseEntity.ok().body("");
    }

    @PostMapping("/verify")
    public boolean verify(@RequestHeader("Authorization") String auth) {
        try {
            JWT.require(Algorithm.HMAC512(SecurityConstants.SECRET))
                    .build()
                    .verify(auth.replace("Bearer ", ""));
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
