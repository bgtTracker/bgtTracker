package pl.edu.pw.bgtTracker.api.tables;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pl.edu.pw.bgtTracker.db.entities.*;
import pl.edu.pw.bgtTracker.db.repos.*;


import java.util.Collection;
import java.util.List;

@Service
public class BillsService {
    @Autowired
    private BillRepository billRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ExpenseCategoryRepository expenseCategoryRepository;

    public JSONObject getBills(long userId) {
        AppUser user = userRepository.findById(userId).get();
        List<Bill> bills =  billRepository.findByUser(user);

        JSONObject js = new JSONObject();
        JSONArray jsArr = new JSONArray();
        
        for(var i: bills)
        {
            JSONObject jsObj = i.toJSON();
            jsArr.add(jsObj);
        }
        js.put("bill", jsArr);
        return js;
    }

    public long putBill(long usrId, String newName, long newAmount, long categoryId) {
        Bill newBill = new Bill();
        AppUser u = userRepository.findById(usrId).get();
        ExpenseCategory cat = expenseCategoryRepository.findById(categoryId);

        newBill.setName(newName);
        newBill.setAmount(newAmount);
        newBill.setCategory(cat);
        newBill.setUser(u);
        billRepository.save(newBill);

        return newBill.getId();
    }

    public void editBill(long expenseId, String newName, long newCatId, long newAmount) {
    }

    public void deleteBill(long billId) {
        billRepository.deleteById(billId);
    }
}
