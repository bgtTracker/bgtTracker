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

    /**
     * Returns object of user bills
     * 
     * Json schema
     * {
     *      bill: [
     *         {
     *              //bill
     *              id: bill id,
     *              amount: bill amount,
     *              name: bill name,
     *              category: expense/bill category name,
     *              category_id: expense/bill category id,
     *              user: owner id,
     *              date: bill due date,
     *              paymentDay: date when bill was paid if its not paid its empty
     *              bankAccount: bill bank account
     *              isPaid: true/false if its paid its true
     *              note: note/comment to this bill
     *         },{},{}....
     *      ]
     * } 
     * @param auth
     * @return JSONObject
     */
    @GetMapping(value ={"/api/getBills"},produces = MediaType.APPLICATION_JSON_VALUE)
    public JSONObject getBillData(Authentication auth){
        long id = this.getUserId(auth);
        return billsService.getBills(id);
    }

    /**
     * Creates new bill object in data base and returns new bill's id
     * @param auth
     * @param name
     * @param category
     * @param amount
     * @param dueDate
     * @param note
     * @param bankNumber
     * @return
     */
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

    /**
     * Updates user bill
     * @param auth
     * @param id
     * @param name
     * @param category
     * @param amount
     * @param dueDate
     * @param note
     * @param bankNumber
     */
    @PostMapping("/api/updateBill")
    public void updateBillData(Authentication auth, @RequestParam(value = "id") String id, @RequestParam(value="name") String name, @RequestParam(value = "category_id") String category, @RequestParam(value="amount") String amount, @RequestParam(value="dueDate") String dueDate, @RequestParam(value="note") String note, @RequestParam(value = "bankNumber") String bankNumber)
    {
        long billId = Long.parseLong(id);
        String newName = name;
        long newAmount = Long.parseLong(amount);
        long newCatId =  Long.parseLong(category);
        billsService.updateBill(billId, newName, newAmount, newCatId, dueDate, note, bankNumber);

    }

    /**
     * Deletes bill
     * @param auth
     * @param id
     */
    @PostMapping("/api/deleteBill")
    public void deleteBillData(Authentication auth, @RequestParam(value = "id") String id)
    {
        long expenseId = Long.parseLong(id);
        billsService.deleteBill(expenseId);
    }

    /**
     * Changes bill state ispaid to true and saves current data in paymentday
     * @param auth
     * @param id
     * @param date
     */
    @PostMapping("/api/payBill")
    public void payBill(Authentication auth, @RequestParam(value = "id") String id, @RequestParam(value = "date") String date)
    {
        long billId = Long.parseLong(id);
        billsService.payBill(billId, date);
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
