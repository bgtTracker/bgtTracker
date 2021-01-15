package pl.edu.pw.bgtTracker.api.objectives;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import net.minidev.json.parser.ParseException;
import pl.edu.pw.bgtTracker.BgtTrackerApplication;
import pl.edu.pw.bgtTracker.db.entities.AppUser;
import pl.edu.pw.bgtTracker.db.repos.UserRepository;

@RestController
public class ObjectivesController {

    @Autowired private ObjectivesService objectivesService;
    @Autowired private UserRepository userRepository;

    @PostMapping("/api/addobjective")
    public JSONObject addObjective(Authentication auth, @RequestBody String bodyString, HttpServletResponse httpServletResponse) {
        AppUser appuser = userRepository.findByEmail(auth.getName());
        System.out.println(bodyString);
        JSONObject body = this.paresStringToJson(bodyString, httpServletResponse);

        objectivesService.addObjective(body, appuser);

        return body;
    }

    @GetMapping(value = {"/api/getobjectives"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public JSONObject getObjectives(Authentication auth) {
        AppUser appuser = userRepository.findByEmail(auth.getName());
        JSONObject data = objectivesService.getObjectives(appuser);
        return data;
    }

    @PutMapping("/api/editobjective")
    public void editObjective(Authentication auth, @RequestBody String bodyString, HttpServletResponse httpServletResponse) {
        JSONObject newObjective = paresStringToJson(bodyString, httpServletResponse);
        objectivesService.editObjective(newObjective);
    }

    @DeleteMapping("/api/deleteobjective")
    public void deleteObjectives(Authentication auth, @RequestParam(value = "id") Long id, HttpServletResponse httpServletResponse) {
        if (id == null) {
            httpServletResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }
        objectivesService.deleteObjectives(id);
    }

    @DeleteMapping("/api/deleteobjectives")
    public void deleteObjectives(Authentication auth, @RequestBody Long[] ids, HttpServletResponse httpServletResponse) {
        if (ids == null) {
            httpServletResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }
        
        for(var id : ids){
            objectivesService.deleteObjectives(id);
        }
    }

    @PostMapping("/api/confimobjective")
    public void confirmObjective(Authentication auth, @RequestParam(value = "id") Long id, HttpServletResponse httpServletResponse)
    {
        if (id == null) {
            httpServletResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }
        AppUser u = userRepository.findByEmail(auth.getName());
        objectivesService.confirmObjective(u, id);
        BgtTrackerApplication.logger.info("confiming objective" + id);
    }

    @PostMapping("/api/confimobjectives")
    public void confirmObjectives(Authentication auth, @RequestBody Long[] ids, HttpServletResponse httpServletResponse)
    {
        if (ids == null) {
            httpServletResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            return;
        }
        AppUser u = userRepository.findByEmail(auth.getName());
        
        for( var id: ids) 
        {
            objectivesService.confirmObjective(u, id);
            BgtTrackerApplication.logger.info("confiming objective" + id);
        }
    }

    private JSONObject paresStringToJson(String bodyString, HttpServletResponse httpServletResponse) {
        JSONParser parser = new JSONParser(JSONParser.MODE_JSON_SIMPLE);
        JSONObject body;
        try {

            body = (JSONObject) parser.parse(bodyString);

        } catch (ParseException pe) {
            body = new JSONObject();
            body.put("error", "bad parsing-bad data to parse");
            httpServletResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);  
        } catch (Exception e) {
            body = new JSONObject();
            body.put("error", "unknwonn error");
            httpServletResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST); //?? good code?
        }

        return body;
    }


}
