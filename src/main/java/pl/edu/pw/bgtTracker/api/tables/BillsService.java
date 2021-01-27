package pl.edu.pw.bgtTracker.api.tables;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pl.edu.pw.bgtTracker.db.entities.*;
import pl.edu.pw.bgtTracker.db.repos.*;


import java.util.Collection;
import java.util.Date;
import java.util.List;

@Service
public class BillsService {
    @Autowired
    private BillRepository billRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ExpenseCategoryRepository expenseCategoryRepository;
    @Autowired
    private ExpenseRepository expenseRepository;

    /**
     * Returns json with user's bills
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
     * @param userId
     * @return JSONObject
     */
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
    /**
     * Saves new bill to data base
     * @param usrId
     * @param newName
     * @param newAmount
     * @param categoryId
     * @param dueDate
     * @param note
     * @param bank
     * @return new bill id
     */
    public long putBill(long usrId, String newName, long newAmount, long categoryId, String dueDate, String note, String bank) {
        Bill newBill = new Bill();
        AppUser u = userRepository.findById(usrId).get();
        ExpenseCategory cat = expenseCategoryRepository.findById(categoryId);

        String dateString = dueDate.substring(5,7) + '/' + dueDate.substring(8,10) + '/' + dueDate.substring(0,4);
        Date newDate = new Date(dateString);

        newBill.setName(newName);
        newBill.setAmount(newAmount);
        newBill.setCategory(cat);
        newBill.setDueDate(newDate);
        newBill.setNote(note);
        newBill.setBankNumber(bank);

        newBill.setUser(u);
        billRepository.save(newBill);

        return newBill.getId();
    }
    
    public void editBill(long expenseId, String newName, long newCatId, long newAmount) {
    }
    /**
     * Deletes bill
     * @param billId
     */
    public void deleteBill(long billId) {
        billRepository.deleteById(billId);
    }
    /**
     * Updates existing bill in data base
     * @param billId
     * @param newName
     * @param newAmount
     * @param newCatId
     * @param dueDate
     * @param note
     * @param bankNumber
     */
    public void updateBill(long billId, String newName, long newAmount, long newCatId, String dueDate, String note, String bankNumber) {
        Bill findBill = billRepository.findById(billId).get();
        ExpenseCategory newCategory = expenseCategoryRepository.findById(newCatId);

        String dateString = dueDate.substring(5,7) + '/' + dueDate.substring(8,10) + '/' + dueDate.substring(0,4);
        Date newDate = new Date(dateString);

        findBill.setName(newName);
        findBill.setAmount(newAmount);
        findBill.setCategory(newCategory);
        findBill.setDueDate(newDate);
        findBill.setNote(note);
        findBill.setBankNumber(bankNumber);
        billRepository.save(findBill);
    }
    /**
     * Switch isPaid flag to true and creates new expense
     * @param billId
     * @param date
     */
    public void payBill(long billId, String date) {
        Bill findBill = billRepository.findById(billId).get();

        String dateString = date.substring(5,7) + '/' + date.substring(8,10) + '/' + date.substring(0,4);
        Date newDate = new Date(dateString);

        findBill.setPaymentDate(newDate);
        findBill.setPaid(true);
        billRepository.save(findBill);

        String name = findBill.getName();
        long amount = findBill.getAmount();
        ExpenseCategory findCat = findBill.getCategory();
        AppUser findUser = findBill.getUser();
        String note = findBill.getNote();

        Expense newExpense = new Expense();
        newExpense.setName(name);
        newExpense.setAmount(amount);
        newExpense.setCategory(findCat);
        newExpense.setDate(newDate);
        newExpense.setUser(findUser);
        newExpense.setNote(note);
        expenseRepository.save(newExpense);

    }
}
