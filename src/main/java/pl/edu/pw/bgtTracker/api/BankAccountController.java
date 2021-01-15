package pl.edu.pw.bgtTracker.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import pl.edu.pw.bgtTracker.db.entities.BankAccount;
import pl.edu.pw.bgtTracker.db.repos.BankAccountRepository;
import pl.edu.pw.bgtTracker.db.repos.UserRepository;

@RestController
@RequestMapping("/api/bank-accounts")
public class BankAccountController {
    @Autowired private BankAccountRepository repository;
    @Autowired private UserRepository users;

    @GetMapping
    public Iterable<BankAccount> getAll(Authentication auth) {
        var user = users.findByEmail(auth.getName());
        return user.getAccounts();
    }

    @PostMapping
    public BankAccount create(Authentication auth, @RequestBody BankAccount account) {
        var user = users.findByEmail(auth.getName());
        account.setId(0);
        account.setUser(user);
        if (account.getBank() != null) {
            account.getBank().setUser(user);
        }
        return repository.save(account);
    }

    @GetMapping("/{id}")
    public BankAccount getOne(Authentication auth, @PathVariable long id) {
        var expense = repository.findById(id);
        if (expense.isPresent() && expense.get().getUser().getEmail().equals(auth.getName())) {
            return expense.get();
        } else {
            throw new AccessDeniedException("Access denied");
        }
    }

    @PutMapping("/{id}")
    public BankAccount setOne(Authentication auth, @PathVariable long id, @RequestBody BankAccount account) {
        var oldBankAccount = repository.findById(id);
        if (oldBankAccount.isPresent() && oldBankAccount.get().getUser().getEmail().equals(auth.getName())) {
            account.setId(id);
            account.setUser(oldBankAccount.get().getUser());
            return repository.save(account);
        } else {
            throw new AccessDeniedException("Access denied");
        }
    }

    @DeleteMapping("/{id}")
    public void delete(Authentication auth, @PathVariable long id) {
        var account = repository.findById(id);
        if (account.isPresent() && account.get().getUser().getEmail().equals(auth.getName())) {
            repository.delete(account.get());
        } else {
            throw new AccessDeniedException("Access denied");
        }
    }
}
