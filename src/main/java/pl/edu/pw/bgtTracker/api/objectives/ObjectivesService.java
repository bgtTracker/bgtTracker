package pl.edu.pw.bgtTracker.api.objectives;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import pl.edu.pw.bgtTracker.db.entities.AppUser;
import pl.edu.pw.bgtTracker.db.entities.Objective;
import pl.edu.pw.bgtTracker.db.repos.ExpenseCategoryRepository;
import pl.edu.pw.bgtTracker.db.repos.ObjectiveRepository;
import pl.edu.pw.bgtTracker.db.repos.UserRepository;

@Service
public class ObjectivesService {

  @Autowired private ObjectiveRepository objectiveRepository;
  @Autowired private ExpenseCategoryRepository expenseCategoryRepository;
  @Autowired private UserRepository userRepository;
  public void addObjective(JSONObject objectiveJson, AppUser user)
  {
    //Objective objective
    System.out.println(objectiveJson.toString());
    Objective objective = new Objective();
    objective = setObjectivToJson(objectiveJson, objective);
    objective.setCategory(expenseCategoryRepository.findById(1L).get());
    objective.setUser(user);
    objectiveRepository.save(objective);
  }

  public JSONObject getObjectives(AppUser user)
  {
      List<Objective> objectives = objectiveRepository.findByUser(user);
      JSONObject data = new JSONObject();

      JSONArray arr = new JSONArray();
      for(var o: objectives)
      {
        arr.add(o.toJSON());
      }
      System.out.println(arr);
      data.put("objectives", arr);
      return data;
  }

  public void editObjective(JSONObject newObjective)
  {
    Objective objective = objectiveRepository.findById((Long)newObjective.get("id")).get();
    setObjectivToJson(newObjective, objective);
    objectiveRepository.save(objective);
  }

  private Objective setObjectivToJson(JSONObject newObjective, Objective objective)
  {
    objective.setAmount((Long)newObjective.get("amount"));
    objective.setName((String)newObjective.get("name"));
    objective.setDescription((String)newObjective.get("description"));
    objective.setDate(new Date((Long) newObjective.get("date")));
    //objective.setPriority((int) newObjective.get("priority"));
    objective.setCategory(expenseCategoryRepository.findById((Long) newObjective.get("category")).get());
    return objective;
  }
  
}
