package pl.edu.pw.bgtTracker.api.tables;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pl.edu.pw.bgtTracker.db.repos.IncomeCategoryRepository;
import pl.edu.pw.bgtTracker.db.repos.IncomeRepository;
import pl.edu.pw.bgtTracker.db.repos.UserRepository;
import pl.edu.pw.bgtTracker.db.entities.Income;
import pl.edu.pw.bgtTracker.db.entities.IncomeCategory;
import pl.edu.pw.bgtTracker.db.entities.AppUser;


import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class IncomesService {

    @Autowired
    private IncomeRepository incomeRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private IncomeCategoryRepository incomeCategoryRepository;

    /**
     * Returns json with user's incomes
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
     * @param userId
     * @return JSONObject
     */
    public JSONObject getIncomes(long userId)
    {
        AppUser user = userRepository.findById(userId).get();
        List<Income> incomes = incomeRepository.findByUser(user);

        JSONObject js = new JSONObject();
        JSONArray jsArr = new JSONArray();
        for(var i :  incomes)
        {
            JSONObject jsObj = i.toJSON();
            jsArr.add(jsObj);
        }
        js.put("income", jsArr);
        return js;
    }

    /**
     * Saves new income to data base
     * @param usrId
     * @param newName
     * @param newAmount
     * @param categoryId
     * @param date
     * @param note
     * @return
     */
    public long putIncome(long usrId, String newName, long newAmount, long categoryId, String date, String note) {
        Income newIncome = new Income();
        AppUser u = userRepository.findById(usrId).get();
        IncomeCategory cat = incomeCategoryRepository.findById(categoryId); // nie dalo sie get()
        String dateString = date.substring(5,7) + '/' + date.substring(8,10) + '/' + date.substring(0,4);
        Date newDate = new Date(dateString);
        //Date newDate = new Date("10/12/2020");
        newIncome.setName(newName);
        newIncome.setAmount(newAmount);
        newIncome.setCategory(cat);

        newIncome.setDate(newDate);
        newIncome.setUser(u);
        newIncome.setNote(note);

        incomeRepository.save(newIncome);

        return newIncome.getId();
    }

    /**
     * Not used
     * Updates income in data base
     * @param incomeId
     * @param newName
     * @param newCatId
     * @param newAmount
     */
    public void editIncome(long incomeId, String newName, long newCatId, long newAmount) {
        Income findIncome = incomeRepository.findById(incomeId).get();
        IncomeCategory newCategory = incomeCategoryRepository.findById(newCatId);
        findIncome.setName(newName);
        findIncome.setCategory(newCategory);
        findIncome.setAmount(newAmount);
        incomeRepository.save(findIncome);
        //return;
    }

    /**
     * Deletes income
     * @param id
     */
    public void deleteIncome(long id) {
        //long categoryId = Long.parseLong(id);
        incomeRepository.deleteById(id);
    }


    /**
     * Updates income in data base
     * @param incomeId
     * @param usrId
     * @param newName
     * @param newAmount
     * @param newCatId
     * @param date
     * @param note
     */
    public void updateIncome(long incomeId, long usrId, String newName, long newAmount, long newCatId, String date, String note) {
        Income findIncome = incomeRepository.findById(incomeId).get();
        IncomeCategory newCategory = incomeCategoryRepository.findById(newCatId);
        String dateString = date.substring(5,7) + '/' + date.substring(8,10) + '/' + date.substring(0,4);
        Date newDate = new Date(dateString);

        findIncome.setName(newName);
        findIncome.setAmount(newAmount);
        findIncome.setCategory(newCategory);
        findIncome.setDate(newDate);
        findIncome.setNote(note);
        incomeRepository.save(findIncome);

    }
}
