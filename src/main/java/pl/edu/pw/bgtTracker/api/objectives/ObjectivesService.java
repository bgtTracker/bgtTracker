package pl.edu.pw.bgtTracker.api.objectives;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.minidev.json.JSONObject;
import pl.edu.pw.bgtTracker.db.entities.Objective;
import pl.edu.pw.bgtTracker.db.repos.ObjectiveRepository;

@Service
public class ObjectivesService {

  @Autowired private ObjectiveRepository objectiveRepository;

  public void addObjective(JSONObject objectiveJson)
  {
    //Objective objective
    System.out.println(objectiveJson.toString());
  }
  
}
