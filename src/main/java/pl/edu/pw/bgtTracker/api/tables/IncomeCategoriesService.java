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
        List<IncomeCategory> in = incomeCategoryRepository.findByUserId(userId);

        JSONObject js = new JSONObject();
        JSONArray jsArr = new JSONArray();

        for(var i : in)
        {
            JSONObject jsObj = i.toJSON();
            jsArr.add(jsObj);
        }
        js.put("category", jsArr);
        return js;
    }

    public long putIncomeCategory(long usrId, String newName) {
        IncomeCategory newCategory = new IncomeCategory();
        AppUser u = userRepository.findById(usrId).get();
        newCategory.setName(newName);
        newCategory.setUser(u);
        incomeCategoryRepository.save(newCategory);
        return newCategory.getId();
    }

    public void editIncomeCategory(long cat_id, String name) {
        IncomeCategory findCategory = incomeCategoryRepository.findById(cat_id);
        findCategory.setName(name);
        incomeCategoryRepository.save(findCategory);
    }

    public void deleteIncomeCategory(long cat_id) {
        incomeCategoryRepository.deleteById(cat_id);
    }
}
