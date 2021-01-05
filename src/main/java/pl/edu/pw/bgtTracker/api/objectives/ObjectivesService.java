package pl.edu.pw.bgtTracker.api.objectives;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import pl.edu.pw.bgtTracker.db.entities.AppUser;
import pl.edu.pw.bgtTracker.db.entities.Objective;
import pl.edu.pw.bgtTracker.db.repos.ObjectiveRepository;

@Service
public class ObjectivesService {

  @Autowired private ObjectiveRepository objectiveRepository;

  public void addObjective(JSONObject objectiveJson, AppUser user)
  {
    //Objective objective
    System.out.println(objectiveJson.toString());
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

      data.put("objectives", arr);
      return data;
  }

  public void editObjective(JSONObject newObjective)
  {
    Objective objective = objectiveRepository.findById((Long)newObjective.get("id")).get();
    objective.setAmount((Long)newObjective.get("amount"));
    objective.setName((String)newObjective.get("name"));
    objective.setDescription((String)newObjective.get("description"));
    objective.setDate(new Date((Long) newObjective.get("date")));
    objective.setPriority((int) newObjective.get("Priority"));
    objectiveRepository.save(objective);
  }
  
}
