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

    public long putExpense(long usrId, String newName, long newAmount, long categoryId) {
        Expense newExpense = new Expense();
        AppUser u = userRepository.findById(usrId).get();
        ExpenseCategory cat = expenseCategoryRepository.findById(categoryId); // nie dalo sie get()
        newExpense.setName(newName);
        newExpense.setAmount(newAmount);
        newExpense.setCategory(cat);
        newExpense.setUser(u);
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
}
