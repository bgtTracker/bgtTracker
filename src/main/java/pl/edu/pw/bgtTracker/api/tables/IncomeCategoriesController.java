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
public class IncomeCategoriesController {
    private final IncomesService incomesService;
    private final UserRepository userRepository;
    private final IncomeCategoriesService incomeCategoriesService;

    public IncomeCategoriesController(IncomesService incomesService, UserRepository userRepository, IncomeCategoriesService incomeCategoriesService) {
        this.incomesService = incomesService;
        this.userRepository = userRepository;
        this.incomeCategoriesService = incomeCategoriesService;
    }

    @GetMapping(value = {"/api/getIncomeCategory"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public JSONObject getIncomeCategory(Authentication auth)
    {
        long id = this.getUserId(auth);
        return incomeCategoriesService.getCategories(id);
    }

    @PostMapping("/api/newIncomeCategory")
    public long newIncomeCategoryData(Authentication auth, @RequestParam(value = "name") String name , @RequestParam(value = "color") String color, @RequestParam(value = "note") String note)
    {
        long usrId = this.getUserId(auth);
        String newName = name;
        long newId2 = incomeCategoriesService.putIncomeCategory(usrId, newName, color, note);
        return newId2;
    }

    @PostMapping("/api/updateIncomeCategory")
    public void updateIncomeCategoryData(@RequestParam(value = "id") String id, @RequestParam(value="name") String name, @RequestParam(value = "color") String color, @RequestParam(value = "note") String note)
    {
        long cat_id = Long.parseLong(id);
        String newName = name;
        incomeCategoriesService.updateIncomeCategory(cat_id, name, color, note);
    }

    @PostMapping("/api/deleteIncomeCategory")
    public void deleteIncomeCategory(@RequestParam(value = "id") String id)
    {
        long cat_id = Long.parseLong(id);
        incomeCategoriesService.deleteIncomeCategory(cat_id);
    }

    private long getUserId(Authentication auth) {
        AppUser u = userRepository.findByEmail(auth.getName());
        return u.getId();
    }
}
