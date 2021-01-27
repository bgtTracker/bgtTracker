package pl.edu.pw.bgtTracker.api.tables;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pl.edu.pw.bgtTracker.db.entities.*;
import pl.edu.pw.bgtTracker.db.repos.*;

import java.util.List;

@Service
public class ExpenseCategoriesService {
    @Autowired
    private ExpenseRepository expenseRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ExpenseCategoryRepository expenseCategoryRepository;

    /**
     * Returns json object with user's expense categories
     * 
     * Json schema
     * {
     *      category: [
     *          {
     *              //expense category
     *              id: expense category id,
     *              name: expense category name,
     *              color: expense category color,
     *              note: expense category note
     * 
     *          },{},{}...
     * 
     *      ]
     * }
     * @param userId
     * @return
     */
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
    /**
     * Saves new expense category to data base
     * @param usrId
     * @param newName
     * @param color
     * @param note
     * @return
     */
    public long putExpenseCategory(long usrId, String newName, String color, String note) {
        ExpenseCategory newCategory = new ExpenseCategory();
        AppUser u = userRepository.findById(usrId).get();
        newCategory.setName(newName);
        newCategory.setColor(color);
        newCategory.setNote(note);
        newCategory.setUser(u);
         expenseCategoryRepository.save(newCategory);
        return newCategory.getId();
    }
    /**
     * Not used
     * Updates existing expense category in data base
     * @param cat_id
     * @param name
     */
    public void editExpenseCategory(long cat_id, String name) {
        ExpenseCategory findCategory = expenseCategoryRepository.findById(cat_id);
        findCategory.setName(name);
        expenseCategoryRepository.save(findCategory);
    }

    /**
     * Deletes expense category
     * @param cat_id
     */
    public void deleteExpenseCategory(long cat_id) {
        expenseCategoryRepository.deleteById(cat_id);
    }

    /**
     * Updates existing expense category in data base
     * @param cat_id
     * @param name
     * @param color
     * @param note
     */
    public void updateExpenseCategory(long cat_id, String name, String color, String note) {
        ExpenseCategory findCategory = expenseCategoryRepository.findById(cat_id);
        findCategory.setName(name);
        findCategory.setColor(color);
        findCategory.setNote(note);
        expenseCategoryRepository.save(findCategory);
    }
}
