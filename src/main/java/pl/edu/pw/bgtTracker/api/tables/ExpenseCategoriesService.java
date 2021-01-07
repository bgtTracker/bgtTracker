package pl.edu.pw.bgtTracker.api.tables;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pl.edu.pw.bgtTracker.db.entities.ExpenseCategory;
import pl.edu.pw.bgtTracker.db.repos.*;
import pl.edu.pw.bgtTracker.db.entities.Income;
import pl.edu.pw.bgtTracker.db.entities.IncomeCategory;
import pl.edu.pw.bgtTracker.db.entities.AppUser;

import java.util.List;

@Service
public class ExpenseCategoriesService {
    @Autowired
    private ExpenseRepository expenseRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ExpenseCategoryRepository expenseCategoryRepository;


    public JSONObject getCategories(long userId) {
        AppUser user = userRepository.findById(userId).get();
        List<ExpenseCategory> expensesCat = expenseCategoryRepository.findByUserId(userId);

        JSONObject js = new JSONObject();
        JSONArray jsArr = new JSONArray();

        for(var i : expensesCat)
        {
            JSONObject jsObj = i.toJSON();
            jsArr.add(jsObj);
        }
        js.put("category", jsArr);
        return js;
    }

    public long putExpenseCategory(long usrId, String newName) {
        ExpenseCategory newCategory = new ExpenseCategory();
        AppUser u = userRepository.findById(usrId).get();
        newCategory.setName(newName);
        newCategory.setUser(u);
         expenseCategoryRepository.save(newCategory);
        return newCategory.getId();
    }

    public void editExpenseCategory(long cat_id, String name) {
        ExpenseCategory findCategory = expenseCategoryRepository.findById(cat_id);
        findCategory.setName(name);
        expenseCategoryRepository.save(findCategory);
    }

    public void deleteExpenseCategory(long cat_id) {
        expenseCategoryRepository.deleteById(cat_id);
    }
}
