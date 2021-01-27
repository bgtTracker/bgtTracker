package pl.edu.pw.bgtTracker.api.tables;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
//import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;
import pl.edu.pw.bgtTracker.db.entities.AppUser;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;
import pl.edu.pw.bgtTracker.db.repos.UserRepository;

@RestController
@CrossOrigin
//@RequestMapping(value = {"/testapi/income"})
public class IncomesController {
    //testing
    private final IncomesService incomesService;
    private final UserRepository userRepository;

    public IncomesController(IncomesService incomesService, UserRepository userRepository) {
        this.incomesService = incomesService;
        this.userRepository = userRepository;
    }

    /**
     * Returns json with user's incomes
     * 
     * Json schema
     * {
     *      income: [
     *          {
     *              //income
     *              id: income id,
     *              amount: income amount,
     *              name: income name,
     *              category: income category name,
     *              category_id: income category id,
     *              user: owner id   
     *              date: income due date
     *              note: note/comment to this income
     *              dateStamp: income date stamp
     *         },{},{}...
     *      ]
     * }
     * @param auth
     * @return JSONObject
     */
    @GetMapping(value ={"/api/getIncomes"},produces = MediaType.APPLICATION_JSON_VALUE)
    public JSONObject getIncomeData(Authentication auth)
    {

        long id = this.getUserId(auth);
        return incomesService.getIncomes(id);

    }

    /**
     * Saves new income to data base
     * @param auth
     * @param name
     * @param category
     * @param amount
     * @param date
     * @param note
     * @return
     */
    @PostMapping("/api/newIncome")
    public long newIncomeData(Authentication auth, @RequestParam(value = "name") String name, @RequestParam(value="category_id") String category, @RequestParam(value="amount") String amount , @RequestParam(value = "date") String date, @RequestParam(value = "note") String note)
    {

        long usrId = this.getUserId(auth);
        String newName = name;
        long newAmount = Long.parseLong(amount);
        long categoryId = Long.parseLong(category);

        //long newId2 = incomesService.putIncome(usrId, newName, newAmount, categoryId);
        long newId = incomesService.putIncome(usrId, newName, newAmount, categoryId, date, note);
        return newId;
        //return newId2;
    }
    /**
     * Updates existing income in data base
     * @param auth
     * @param id
     * @param name
     * @param category
     * @param amount
     * @param date
     * @param note
     */
    @PostMapping("/api/updateIncome")
    public void updateIncomeData(Authentication auth, @RequestParam(value = "id") String id, @RequestParam(value="name") String name, @RequestParam(value = "category_id") String category, @RequestParam(value="amount") String amount, @RequestParam(value = "date") String date, @RequestParam(value = "note") String note)
    {
        long incomeId = Long.parseLong(id);
        long usrId = this.getUserId(auth);
        String newName = name;
        long newAmount = Long.parseLong(amount);
        long newCatId =  Long.parseLong(category);

        incomesService.updateIncome(incomeId, usrId, newName, newAmount, newCatId, date, note);

    }
    /**
     * Deletes income
     * @param auth
     * @param id
     */
    @PostMapping("/api/deleteIncome")
    public void deleteIncomeData(Authentication auth, @RequestParam(value = "id") String id)
    {
        /* Znajduje obiekt w bazie danych i usuwa go */
        long incomeId = Long.parseLong(id);
        incomesService.deleteIncome(incomeId);
    }

    /**
     * Returns user id
     * @param auth
     * @return
     */
    private long getUserId(Authentication auth)
    {
        AppUser u = userRepository.findByEmail(auth.getName());
        return u.getId();
    }

}
