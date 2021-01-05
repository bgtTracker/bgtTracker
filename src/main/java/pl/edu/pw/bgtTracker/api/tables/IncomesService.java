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
/*
    public JSONObject getIncomes(long userid){
        User u = userRepository.findById(userid).get();
        List<Income> income = incomeRepository.findByUser(u);


        JSONObject newD = new JSONObject();
        JSONArray arr = new JSONArray();


    }*/
    /*public Income saveIncome(long userid, String name, long amount, long category_id){
        Income newIncome = new Income();
        //AppUser u = userRepository.findById(userid).get();
        //IncomeCategory iCat = incomeCategoryRepository.findById(category_id);

        newIncome.setName(name);
        newIncome.setAmount(amount);
        newIncome.setUser(u);
        newIncome.setCategory(iCat);
        incomeRepository.save(newIncome);
        return newIncome;
    }*/

    /*public void updateIncome(Income income){
        try{
            Income oldIncome = incomeRepository.findById(income.getId()).get();
            oldIncome.setName(income.getName());
            oldIncome.setAmount(income.getAmount());
            oldIncome.setCategory(income.getCategory());
            incomeRepository.save(oldIncome);
        }catch (Exception e) {

        }
    }

    public void deleteIncome(long id){
        incomeRepository.deleteById(id);
    }

    public List<Income> getIncomes(long userID) {
        AppUser u = userRepository.findById(userId).get();
        //User u2 =userRepository.findAll()
        //List<Income> income = incomeRepository.findByUser(u);
        List<Income> income = incomeRepository.findByUser(u);
        return income;
    }*/

    /*public JSONObject getIncomes2(String userEmail) {
        AppUser usr = userRepository.findByEmail(userEmail); // getting user
        //AppUser u = userRepository.findById(userID).get(); //geting user object
        List<Income> incomes = incomeRepository.findByUser(usr);

        JSONObject dataFeed = new JSONObject();
        JSONArray arr = new JSONArray();
        

        for(var a: incomes){
            JSONObject n = a.toJSON();
            arr.add(n);
        }
        dataFeed.put("incomes", arr);
        return dataFeed;
    }*/
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
/*
        JSONArray jsArr = new JSONArray();
        JSONObject jsObj = new JSONObject();
        jsObj.put("t0","test0");
        jsObj.put("t0","test0");
        jsObj.put("t1","test0");
        jsObj.put("t2","test0");
        jsObj.put("userID",userId);
        jsArr.add(jsObj);
        js.put("tak", jsArr);
        return js;*/
    }

    public void putIncome(long usrId, String newName, long newAmount, long categoryId) {
        Income newIncome = new Income();
        AppUser u = userRepository.findById(usrId).get();
        IncomeCategory cat = incomeCategoryRepository.findById(categoryId); // nie dalo sie get()
        newIncome.setName(newName);
        newIncome.setAmount(newAmount);
        newIncome.setCategory(cat);
        newIncome.setUser(u);
        incomeRepository.save(newIncome);
        //return newIncome;
    }

    public void deleteIncome(String id) {
        long categoryId = Long.parseLong(id);
        incomeRepository.deleteById(categoryId);
    }
}
