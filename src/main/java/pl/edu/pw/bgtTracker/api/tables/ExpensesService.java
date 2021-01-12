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
public class ExpensesService {

    @Autowired
    private ExpenseRepository expenseRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ExpenseCategoryRepository expenseCategoryRepository;

    public JSONObject getExpenses(long userId) {
        AppUser user = userRepository.findById(userId).get();
        List<Expense> expenses = expenseRepository.findByUser(user);

        JSONObject js = new JSONObject();
        JSONArray jsArr = new JSONArray();
        for(var i :  expenses)
        {
            JSONObject jsObj = i.toJSON();
            jsArr.add(jsObj);
        }
        js.put("expense", jsArr);
        return js;
    }

    public long putExpense(long usrId, String newName, long newAmount, long categoryId, String date, String note) {
        Expense newExpense = new Expense();
        AppUser u = userRepository.findById(usrId).get();
        ExpenseCategory cat = expenseCategoryRepository.findById(categoryId); // nie dalo sie get()
        String dateString = date.substring(5,7) + '/' + date.substring(8,10) + '/' + date.substring(0,4);
        Date newDate = new Date(dateString);
        newExpense.setName(newName);
        newExpense.setAmount(newAmount);
        newExpense.setCategory(cat);
        newExpense.setDate(newDate);
        newExpense.setUser(u);
        newExpense.setNote(note);
        expenseRepository.save(newExpense);

        return newExpense.getId();
    }

    public long putExpense(AppUser user, String newName, long newAmount, ExpenseCategory category, Date date, String note) {
        Expense newExpense = new Expense();
        newExpense.setName(newName);
        newExpense.setAmount(newAmount);
        newExpense.setCategory(category);
        newExpense.setDate(date);
        newExpense.setUser(user);
        newExpense.setNote(note);
        expenseRepository.save(newExpense);

        return newExpense.getId();
    }

    

    public void editExpense(long expenseId, String newName, long newCatId, long newAmount) {
        Expense findExpense = expenseRepository.findById(expenseId).get();
        ExpenseCategory newCategory = expenseCategoryRepository.findById(newCatId);
        findExpense.setName(newName);
        findExpense.setCategory(newCategory);
        findExpense.setAmount(newAmount);
        expenseRepository.save(findExpense);
    }

    public void deleteExpense(long expenseId) {
        expenseRepository.deleteById(expenseId);
    }

    public void updateExpense(long expenseId, long usrId, String newName, long newAmount, long newCatId, String date, String note) {
        Expense findExpense = expenseRepository.findById(expenseId).get();
        ExpenseCategory newCategory = expenseCategoryRepository.findById(newCatId);
        String dateString = date.substring(5,7) + '/' + date.substring(8,10) + '/' + date.substring(0,4);
        Date newDate = new Date(dateString);

        findExpense.setName(newName);
        findExpense.setAmount(newAmount);
        findExpense.setCategory(newCategory);
        findExpense.setDate(newDate);
        findExpense.setNote(note);
        expenseRepository.save(findExpense);
    }
}
