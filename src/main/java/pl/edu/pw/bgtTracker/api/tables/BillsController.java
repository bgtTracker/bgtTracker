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
public class BillsController {
    private final BillsService billsService;
    private final UserRepository userRepository;

    public BillsController(BillsService billsService, UserRepository userRepository) {
        this.billsService = billsService;
        this.userRepository = userRepository;
    }

    @GetMapping(value ={"/api/getBills"},produces = MediaType.APPLICATION_JSON_VALUE)
    public JSONObject getBillData(Authentication auth){
        long id = this.getUserId(auth);
        return billsService.getBills(id);
    }

    @PostMapping("/api/newBill")
    public long newBillData(Authentication auth, @RequestParam(value = "name") String name, @RequestParam(value="category_id") String category, @RequestParam(value="amount") String amount, @RequestParam(value="dueDate") String dueDate, @RequestParam(value="note") String note, @RequestParam(value = "bankNumber") String bankNumber)
    {

        long usrId = this.getUserId(auth);
        String newName = name;
        long newAmount = Long.parseLong(amount);
        long categoryId = Long.parseLong(category);

        /* poprawic o date*/
        long newId2 = billsService.putBill(usrId, newName, newAmount, categoryId, dueDate, note, bankNumber);
        return newId2;
    }

    @PostMapping("/api/updateBill")
    public void updateBillData(Authentication auth, @RequestParam(value = "id") String id, @RequestParam(value="name") String name, @RequestParam(value = "category_id") String category, @RequestParam(value="amount") String amount, @RequestParam(value="dueDate") String dueDate, @RequestParam(value="note") String note, @RequestParam(value = "bankNumber") String bankNumber)
    {
        long billId = Long.parseLong(id);
        String newName = name;
        long newAmount = Long.parseLong(amount);
        long newCatId =  Long.parseLong(category);
        billsService.updateBill(billId, newName, newAmount, newCatId, dueDate, note, bankNumber);

    }
    @PostMapping("/api/deleteBill")
    public void deleteBillData(Authentication auth, @RequestParam(value = "id") String id)
    {
        long expenseId = Long.parseLong(id);
        billsService.deleteBill(expenseId);
    }

    @PostMapping("/api/payBill")
    public void payBill(Authentication auth, @RequestParam(value = "id") String id, @RequestParam(value = "date") String date)
    {
        long billId = Long.parseLong(id);
        billsService.payBill(billId, date);
    }

    private long getUserId(Authentication auth)
    {
        AppUser u = userRepository.findByEmail(auth.getName());
        return u.getId();
    }
}
