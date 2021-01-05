package pl.edu.pw.bgtTracker.api.tables;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
//import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;
import pl.edu.pw.bgtTracker.db.entities.AppUser;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;
import pl.edu.pw.bgtTracker.db.repos.UserRepository;

@RestController
@CrossOrigin
//@RequestMapping(value = {"/testapi/income"})
public class IncomesController {
    //testing
    private final IncomesService incomesService;
    private final UserRepository userRepository;

    public IncomesController(IncomesService incomesService, UserRepository userRepository) {
        this.incomesService = incomesService;
        this.userRepository = userRepository;
    }

    /*@GetMapping(value = {"/"}, produces=MediaType.APPLICATION_JSON_VALUE)
    public String getUserIncome(@RequestParam(value = "userId", defaultValue = "15") String usrId){
        long userID = Long.parseLong(usrId);

        return getExampleData(userID).toString();

    }*/
    @GetMapping(value ={"/api/getIncomes"},produces = MediaType.APPLICATION_JSON_VALUE)
    public JSONObject getIncomeData(Authentication auth)
    {
        /* Zwraca [JSONObjects] ktore sa uzywane w tabeli income*/
    /*
        JSONObject data = new JSONObject();
        System.out.println("Jest");

        data.put("not1", 12);
        data.put("not2", 14);
        data.put("not3", 16);

        return data;*/
        long id = this.getUserId(auth);

        /*JSONObject js = new JSONObject();
        JSONArray jsArr = new JSONArray();
        JSONObject jsObj = new JSONObject();
        jsObj.put("t0","test0");
        jsObj.put("t0","test0");
        jsObj.put("t1","test0");
        jsObj.put("t2","test0");
        jsObj.put("userID",id);
        jsArr.add(jsObj);
        js.put("tak", jsArr);*/
        //JSONArray jsArr = new JSONArray();
        //jsArr.put(jsObj.toMap());



        return incomesService.getIncomes(id);
        //return js;
    }
    @PostMapping("/api/newIncome")
    public void newIncomaData(Authentication auth, @RequestParam(value = "name") String name, @RequestParam(value="category_id") String category, @RequestParam(value="amount") String amount)
    {
        /* Tworzy nowy obiekt w repozytorium przez service*/
        /*
        * */

        long usrId = this.getUserId(auth);
        String newName = name;
        long newAmount = Long.parseLong(amount);
        long categoryId = Long.parseLong(category);


        incomesService.putIncome(usrId, newName, newAmount, categoryId);
        //return;
    }

    @PostMapping("/api/editIncome")
    public void updateIncomeData(@RequestParam(value = "id") String id, @RequestParam(value="name") String name, @RequestParam(value = "category_id") String category, @RequestParam(value="amount") String amount)
    {
        /* Odanajduje i zmienia zawartosc w bazie danych*/


    }

    @PostMapping("/api/deleteIncome")
    public void deleteIncomeData(Authentication auth, @RequestParam(value = "id") String id)
    {
        /* Znajduje obiekt w bazie danych i usuwa go */
        incomesService.deleteIncome(id);
    }


    private long getUserId(Authentication auth)
    {
        AppUser u = userRepository.findByEmail(auth.getName());
        return u.getId();
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
