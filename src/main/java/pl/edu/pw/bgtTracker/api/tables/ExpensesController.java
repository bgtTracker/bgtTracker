package pl.edu.pw.bgtTracker.api.tables;

//import org.json.JSONObject;
import net.minidev.json.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.RestController;
import pl.edu.pw.bgtTracker.db.entities.AppUser;
import pl.edu.pw.bgtTracker.db.repos.UserRepository;

@RestController
@CrossOrigin
public class ExpensesController {
    private final ExpensesService expensesService;
    private final UserRepository userRepository;

    public ExpensesController(ExpensesService expensesService, UserRepository userRepository) {
        this.expensesService = expensesService;
        this.userRepository = userRepository;
    }

    @GetMapping(value ={"/api/getExpenses"},produces = MediaType.APPLICATION_JSON_VALUE)
    public JSONObject getExpenseData(Authentication auth){
        long id = this.getUserId(auth);
        return expensesService.getExpenses(id);
    }

    @PostMapping("/api/newExpense")
    public long newExpenseData(Authentication auth, @RequestParam(value = "name") String name, @RequestParam(value="category_id") String category, @RequestParam(value="amount") String amount, @RequestParam String date ,@RequestParam String note)
    {


        long usrId = this.getUserId(auth);
        String newName = name;
        long newAmount = Long.parseLong(amount);
        long categoryId = Long.parseLong(category);
        String newDate = date;
        String newNote = note;


        long newId = expensesService.putExpense(usrId, newName, newAmount, categoryId, newDate, newNote);
        return newId;
    }

    @PostMapping("/api/updateExpense")
    public void updateExpenseData(Authentication auth, @RequestParam(value = "id") String id, @RequestParam(value="name") String name, @RequestParam(value = "category_id") String category, @RequestParam(value="amount") String amount, @RequestParam String date ,@RequestParam String note)
    {

        long expenseId = Long.parseLong(id);
        long usrId = this.getUserId(auth);
        String newName = name;
        long newAmount = Long.parseLong(amount);
        long newCatId =  Long.parseLong(category);
        expensesService.updateExpense(expenseId, usrId, newName,newAmount, newCatId, date, note);

    }

    @PostMapping("/api/deleteExpense")
    public void deleteExpenseData(Authentication auth, @RequestParam(value = "id") String id)
    {
        /* Znajduje obiekt w bazie danych i usuwa go */
        long expenseId = Long.parseLong(id);
        expensesService.deleteExpense(expenseId);
    }

    private long getUserId(Authentication auth)
    {
        AppUser u = userRepository.findByEmail(auth.getName());
        return u.getId();
    }
}
