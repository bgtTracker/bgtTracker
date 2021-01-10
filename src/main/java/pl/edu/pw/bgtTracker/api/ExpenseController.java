package pl.edu.pw.bgtTracker.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import pl.edu.pw.bgtTracker.db.entities.Expense;
import pl.edu.pw.bgtTracker.db.repos.ExpenseRepository;
import pl.edu.pw.bgtTracker.db.repos.UserRepository;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {
    @Autowired private ExpenseRepository repository;
    @Autowired private UserRepository users;

    @GetMapping
    public Iterable<Expense> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public void create(Authentication auth, @RequestBody Expense expense) {
        expense.setId(0);
        expense.setUser(users.findByEmail(auth.getName()));
        repository.save(expense);
    }

    @GetMapping("/{id}")
    public Expense getOne(Authentication auth, @PathVariable long id) {
        var expense = repository.findById(id);
        if (expense.isPresent() && expense.get().getUser().getEmail().equals(auth.getName())) {
            return expense.get();
        } else {
            throw new AccessDeniedException("Access denied");
        }
    }

    @PutMapping("/{id}")
    public void setOne(Authentication auth, @PathVariable long id, @RequestBody Expense expense) {
        var oldExpense = repository.findById(id);
        if (oldExpense.isPresent() && oldExpense.get().getUser().getEmail().equals(auth.getName())) {
            expense.setId(id);
            expense.setUser(oldExpense.get().getUser());
            repository.save(expense);
        } else {
            throw new AccessDeniedException("Access denied");
        }
    }

    @DeleteMapping("/{id}")
    public void delete(Authentication auth, @PathVariable long id) {
        var expense = repository.findById(id);
        if (expense.isPresent() && expense.get().getUser().getEmail().equals(auth.getName())) {
            repository.delete(expense.get());
        } else {
            throw new AccessDeniedException("Access denied");
        }
    }
}
