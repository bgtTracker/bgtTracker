package pl.edu.pw.bgtTracker.api.objectives;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import pl.edu.pw.bgtTracker.api.tables.ExpensesService;
import pl.edu.pw.bgtTracker.api.tables.IncomesService;
import pl.edu.pw.bgtTracker.db.entities.AppUser;
import pl.edu.pw.bgtTracker.db.entities.ExpenseCategory;
import pl.edu.pw.bgtTracker.db.entities.Objective;
import pl.edu.pw.bgtTracker.db.repos.ExpenseCategoryRepository;
import pl.edu.pw.bgtTracker.db.repos.ExpenseRepository;
import pl.edu.pw.bgtTracker.db.repos.IncomeRepository;
import pl.edu.pw.bgtTracker.db.repos.ObjectiveRepository;
import pl.edu.pw.bgtTracker.db.repos.TestExpenseCategoryRepository;
import pl.edu.pw.bgtTracker.db.repos.UserRepository;

@Service
public class ObjectivesService {

    @Autowired private ObjectiveRepository objectiveRepository;
    @Autowired private ExpenseCategoryRepository expenseCategoryRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private ExpensesService expensesService;
    @Autowired private IncomesService incomesService;
    @Autowired private ExpenseRepository expenseRepository;
    @Autowired private IncomeRepository incomeRepository;

    /**
     * Add new objective with data form json, addionaly setting user 
     * @param objectiveJson - data for objective
     * @param user - user that will have the objective
     */
    public JSONObject addObjective(JSONObject objectiveJson, AppUser user) {
        //Objective objective
        Objective objective = new Objective();
        objective = setObjectivToJson(objectiveJson, objective);
        objective.setUser(user);
        objective =  objectiveRepository.save(objective);
        return objective.toJSON();
    }

    public void addObjective(Long amount, String name, String description, Date date, Long priority, ExpenseCategory category, AppUser user) {
        Objective objective = new Objective();
        objective.setAmount(amount);
        objective.setName(name);
        objective.setDescription(description);
        objective.setDate(date);
        objective.setPriority(priority);
        objective.setCategory(category);
        objective.setUser(user);
        objectiveRepository.save(objective);
    }
    
    /**
     * Returns json with notifications 
     * 
     * Json schema
     * {
     *  objectives:  [
     *         {
     *              //objective 1 json
     *              //added progres to json
     *          },
     *          {},{},...
     *      ]
     * }
     * @param user- which user objectives to return
     * @return
     */
    public JSONObject getObjectives(AppUser user) {
        List<Objective> objectives = user.getObjectives();
        JSONObject data = new JSONObject();
        
        long balance = 0;
        for(var i: incomeRepository.findByUser(user))
        {
            balance += i.getAmount();
        }
        for(var e: expenseRepository.findByUser(user))
        {
            balance -= e.getAmount();
        }
        
        if(balance < 0)
            balance = 0;
        JSONArray arr = new JSONArray();
        for (var o : objectives) {
            JSONObject oJson = o.toJSON();
            float proggres = ((float)balance/o.getAmount())*100;
            if(proggres > 100)
              proggres = 100;
            oJson.put("progress", proggres);
            arr.add(oJson);
        }

        data.put("objectives", arr);
        return data;
    }

    public void deleteObjectives(Long id) {
        Objective objective = objectiveRepository.findById(id).get();
        objectiveRepository.delete(objective);
    }

    /**
     * Updates objective in db with data from given json
     * @param newObjective - new data to 
     */
    public void editObjective(JSONObject newObjective) {
        System.out.println(newObjective.toJSONString());
        Objective objective = objectiveRepository.findById((Long) newObjective.get("id")).get();
        setObjectivToJson(newObjective, objective);
        objectiveRepository.save(objective);
    }

    public void confirmObjective(AppUser user, Long objectiveID)
    {
        Objective objective = objectiveRepository.findById(objectiveID).get();
        expensesService.putExpense(user, "Confirm objective: " + objective.getName(), objective.getAmount(),
        objective.getCategory(), objective.getDate(), objective.getDescription());
        objectiveRepository.delete(objective);
    }

    /**
     * sets objective data to data from given json
     * @param newObjective - json with new data
     * @param objective - objectives to set
     * @return
     */
    private Objective setObjectivToJson(JSONObject newObjective, Objective objective) {
        objective.setAmount((Long) newObjective.get("amount"));
        objective.setName((String) newObjective.get("name"));
        objective.setDescription((String) newObjective.get("description"));
        objective.setDate(new Date((Long) newObjective.get("date")));
        objective.setPriority((Long) newObjective.get("priority"));
        objective.setCategory(expenseCategoryRepository.findById((Long) newObjective.get("categoryId")).get());
        return objective;
    }

}
