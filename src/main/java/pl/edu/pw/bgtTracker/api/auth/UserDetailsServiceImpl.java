package pl.edu.pw.bgtTracker.api.auth;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pl.edu.pw.bgtTracker.db.entities.AppUser;
import pl.edu.pw.bgtTracker.db.repos.UserRepository;

import java.util.Collections;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository repository;

    public UserDetailsServiceImpl(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser user = repository.findByEmail(username);

        if (user == null) {
            throw new UsernameNotFoundException(username);
        }

        return new User(user.getEmail(), user.getPassword(), Collections.emptyList());
    }
}
