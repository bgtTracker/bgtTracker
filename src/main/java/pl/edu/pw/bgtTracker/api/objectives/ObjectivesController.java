package pl.edu.pw.bgtTracker.api.objectives;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import net.minidev.json.parser.ParseException;

@RestController
public class ObjectivesController {
  
   @Autowired private ObjectivesService objectivesService;

   @PostMapping("/api/addobjective")
   public JSONObject addObjective(Authentication auth, @RequestBody String bodyString, HttpServletResponse httpServletResponse)
   {
      System.out.println(bodyString);
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
      
      objectivesService.addObjective(body);
      
      return body;
   }


}
