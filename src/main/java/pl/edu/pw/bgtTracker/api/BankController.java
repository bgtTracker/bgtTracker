package pl.edu.pw.bgtTracker.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import pl.edu.pw.bgtTracker.db.entities.Bank;
import pl.edu.pw.bgtTracker.db.repos.BankRepository;
import pl.edu.pw.bgtTracker.db.repos.UserRepository;

@RestController
@RequestMapping("/api/banks")
public class BankController {
    @Autowired private BankRepository repository;
    @Autowired private UserRepository users;

    @GetMapping
    public Iterable<Bank> getAll(Authentication auth) {
        var user = users.findByEmail(auth.getName());
        return user.getBanks();
    }

    @PostMapping
    public Bank create(Authentication auth, @RequestBody Bank bank) {
        var user = users.findByEmail(auth.getName());
        bank.setId(null);
        bank.setUser(user);
        return repository.save(bank);
    }

    @GetMapping("/{id}")
    public Bank getOne(Authentication auth, @PathVariable long id) {
        var expense = repository.findById(id);
        if (expense.isPresent() && expense.get().getUser().getEmail().equals(auth.getName())) {
            return expense.get();
        } else {
            throw new AccessDeniedException("Access denied");
        }
    }

    @PutMapping("/{id}")
    public void setOne(Authentication auth, @PathVariable long id, @RequestBody Bank bank) {
        var oldBank = repository.findById(id);
        if (oldBank.isPresent() && oldBank.get().getUser().getEmail().equals(auth.getName())) {
            bank.setId(id);
            bank.setUser(oldBank.get().getUser());
            repository.save(bank);
        } else {
            throw new AccessDeniedException("Access denied");
        }
    }

    @DeleteMapping("/{id}")
    public void delete(Authentication auth, @PathVariable long id) {
        var bank = repository.findById(id);
        if (bank.isPresent() && bank.get().getUser().getEmail().equals(auth.getName())) {
            repository.delete(bank.get());
        } else {
            throw new AccessDeniedException("Access denied");
        }
    }
}
