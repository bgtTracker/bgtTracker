package pl.edu.pw.bgtTracker.api.tables;

import net.minidev.json.JSONArray;
//import org.json.JSONArray;
import org.json.JSONObject;
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
    public Income saveIncome(long userid, String name, long amount, long category_id){
        Income newIncome = new Income();
        AppUser u = userRepository.findById(userid).get();
        IncomeCategory iCat = incomeCategoryRepository.findById(category_id);

        newIncome.setName(name);
        newIncome.setAmount(amount);
        newIncome.setUser(u);
        newIncome.setCategory(iCat);
        incomeRepository.save(newIncome);
        return newIncome;
    }

    public void updateIncome(Income income){
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
    }

    public JSONObject getIncomes2(String userEmail) {
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
    }
}
