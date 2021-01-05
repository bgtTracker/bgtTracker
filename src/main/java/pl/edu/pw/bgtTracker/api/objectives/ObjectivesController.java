package pl.edu.pw.bgtTracker.api.objectives;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import net.minidev.json.parser.ParseException;
import pl.edu.pw.bgtTracker.db.entities.AppUser;
import pl.edu.pw.bgtTracker.db.repos.UserRepository;

@RestController
public class ObjectivesController {
  
   @Autowired private ObjectivesService objectivesService;
   @Autowired private UserRepository userRepository;

   @PostMapping("/api/addobjective")
   public JSONObject addObjective(Authentication auth, @RequestBody String bodyString, HttpServletResponse httpServletResponse)
   {
      AppUser appuser = userRepository.findByEmail(auth.getName());

      JSONObject body = this.paresStringToJson(bodyString, httpServletResponse);

      objectivesService.addObjective(body, appuser);
      
      return body;
   }

   @GetMapping("/api/getobjectives")
   public JSONObject getObjectives(Authentication auth)
   {
      AppUser appuser = userRepository.findByEmail(auth.getName());
      return objectivesService.getObjectives(appuser);
   }

   @PutMapping("/api/editobjectives")
   public void editObjective(Authentication auth, @RequestBody String bodyString, HttpServletResponse httpServletResponse)
   {
      JSONObject newObjective = paresStringToJson(bodyString, httpServletResponse);
      objectivesService.editObjective(newObjective);
   }

   private JSONObject paresStringToJson(String bodyString, HttpServletResponse httpServletResponse)
   {
      JSONParser parser = new JSONParser(JSONParser.MODE_JSON_SIMPLE);
      JSONObject body;
      try {

       body = (JSONObject) parser.parse(bodyString);
      
      }catch(ParseException pe)
      {
         body = new JSONObject();
         body.put("error", "bad parsing-bad data to parse");
         httpServletResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);
      }catch(Exception e)
      {
         body = new JSONObject();
         body.put("error", "unknwonn error");
         httpServletResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST); //?? good code?
      }
      
      return body;
   }


}
