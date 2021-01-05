package pl.edu.pw.bgtTracker.api.tables;

import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;
import pl.edu.pw.bgtTracker.db.entities.Income;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = {"/testapi/income"})
public class IncomesController {
    //testing
    private final IncomesService incomesService;

    public IncomesController(IncomesService incomesService) {
        this.incomesService = incomesService;
    }

    @GetMapping(value = {"/"}, produces=MediaType.APPLICATION_JSON_VALUE)
    public String getUserIncome(@RequestParam(value = "userId", defaultValue = "1") String usrId){
        long userID = Long.parseLong(usrId);

        return getExampleData(userID).toString();

    }

    public JSONObject getExampleData(long userId)
    {
        JSONObject data = new JSONObject();

        return data;
    }
/*
    @GetMapping(value = "/api/3")
    public JSONObject getIncomes(@RequestParam(value = "user") String user){
        return incomesService.getIncomes(Long.parseLong(user));
    }*/
/*
    @GetMapping("/api/incomes/get")
    //public List<Income> getIncomes(@RequestParam(value = "user") String user){
    public List<Income> getIncomes(@RequestParam(value = "user") String user){
        user = "2";
        return incomesService.getIncomes(Long.parseLong(user));
    }*/
    /*
    @GetMapping(value="/{id}")
    //public List<Income> getIncomes(@RequestParam(value = "user") String user){
    public List<Income> getIncomes(@PathVariable("id") String user){

        return incomesService.getIncomes(Long.parseLong(user));
}*/
    /*@GetMapping(value="/{id}")
    public JSONObject getIncomes(@PathVariable("id") String user){

        return incomesService.getIncomes2(Long.parseLong(user));
}*/

}
