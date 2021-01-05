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


import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class IncomeCategoriesService {

    @Autowired
    private IncomeRepository incomeRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private IncomeCategoryRepository incomeCategoryRepository;

    public JSONObject getCategories(long userId){
        AppUser user = userRepository.findById(userId).get();
        List<Income> incomes = incomeRepository.findByUser(user);
        //List<IncomeCategory> in = incomeCategoryRepository.findByUserId(userId);

        JSONObject js = new JSONObject();
        JSONArray jsArr = new JSONArray();
        ArrayList<Long> uniqueCategoryId = new ArrayList<Long>();
        for(var i : incomes)
        {
            uniqueCategoryId.add(i.getCategory().getId());
            System.out.println(i.getCategory().getId());
        }
        HashSet<Long> hSetUniqueCategory = new HashSet(uniqueCategoryId);

        for (var i : hSetUniqueCategory)
        {
            System.out.println(i);
            /*
            IncomeCategory incomeCategory = incomeCategoryRepository.findById(i).get(); // get ?
            JSONObject jsObj = incomeCategory.toJSON();
            jsArr.add(jsObj);*/
        }
        //js.put("category", jsArr);


        /*JSONObject jsObj = new JSONObject();
        jsObj.put("t0","test0");
        jsArr.add(jsObj);
        js.put("tak", jsArr);*/
        return js;
    }

    public void putIncomeCategory(long usrId, String newName) {
    }

    public void editIncomeCategory(long cat_id, String name) {
    }

    public void deleteIncomeCategory(long cat_id) {
    }
}
