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
public class ExpenseCategoriesController {
    private final ExpensesService expensesService;
    private final UserRepository userRepository;
    private final ExpenseCategoriesService expenseCategoriesService;

    public ExpenseCategoriesController(ExpensesService expensesService, UserRepository userRepository, ExpenseCategoriesService expenseCategoriesService) {
        this.expensesService = expensesService;
        this.userRepository = userRepository;
        this.expenseCategoriesService = expenseCategoriesService;
    }

    @GetMapping(value = {"/api/getExpenseCategory"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public JSONObject getExpenseCategory(Authentication auth)
    {
        long id = this.getUserId(auth);
        return expenseCategoriesService.getCategories(id);
    }

    @PostMapping("/api/newExpenseCategory")
    public long newExpenseCategoryData(Authentication auth, @RequestParam(value = "name") String name, @RequestParam(value = "color") String color, @RequestParam(value = "note") String note)
    {
        long usrId = this.getUserId(auth);
        String newName = name;
        long newId2 = expenseCategoriesService.putExpenseCategory(usrId, newName, color, note);
        return newId2;
    }

    @PostMapping("/api/editExpenseCategory")
    public void updateExpenseCategoryData(@RequestParam(value = "id") String id, @RequestParam(value="name") String name)
    {
        long cat_id = Long.parseLong(id);
        String newName = name;
        expenseCategoriesService.editExpenseCategory(cat_id, name);
    }

    @PostMapping("/api/deleteExpenseCategory")
    public void deleteExpenseCategory(@RequestParam(value = "id") String id)
    {
        long cat_id = Long.parseLong(id);
        expenseCategoriesService.deleteExpenseCategory(cat_id);
    }

    private long getUserId(Authentication auth) {
        AppUser u = userRepository.findByEmail(auth.getName());
        return u.getId();
    }
}
