package pl.edu.pw.bgtTracker.summaries;

import java.util.ArrayList;

import com.fasterxml.jackson.core.JsonFactoryBuilder;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.minidev.json.JSONObject;


@RestController
@RequestMapping(value = {"/testapi/summary"})
public class SummariesController {
    
    @GetMapping(value = {"/"}, produces=MediaType.APPLICATION_JSON_VALUE)
    public String getUserExpanse()
    {

        int goal = 5000;
        String[] days = {"2020-11-00", "2020-11-01", "2020-11-02", "2020-11-03", "2020-11-04", "2020-11-05", "2020-11-06", "2020-11-07", 
        "2020-11-08", "2020-11-09", "2020-11-10", "2020-11-11", "2020-11-12", "2020-11-13", "2020-11-14", "2020-11-15", 
        "2020-11-16", "2020-11-17", "2020-11-18", "2020-11-19", "2020-11-20", "2020-11-21", "2020-11-22", "2020-11-23", 
        "2020-11-24", "2020-11-25", "2020-11-26", "2020-11-27", "2020-11-28", "2020-11-29"};
        int[] balancePerDay = {886, -279, -237, -886, -168, -159, 1245, 1991, 337, 1714, -223, 1717, 386, 252, -546, 1832, 592, -879, 1071, -908, -89, 1118, 1211, -823, 810, 1189, 1263, 377, 999, 1103};
        
        String[] categories = {"Food", "Home", "Car", "Commute", "Luxuries"};
        int[] categoryData = {1000, 400, 500, 150, 400};

        int [] daylyExpenses = {1814, 500, 1605, 822, 299, 991, 1307, 53, 138, 881, 869, 1325, 936, 93, 1795, 1766, 1219, 1379, 313, 752, 867, 859, 448, 610, 990, 1739, 750, 470, 593, 446};


        int [] yearlyExpenses = {3000, 3000, 4000, 5000, 1200, 3000, 5000, 3000, 4032, 5255, 3232, 3131};
        String[] months = {"January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"};


        JSONObject res = new JSONObject();
        JSONObject thisMonth = new JSONObject();
        JSONObject yearly = new JSONObject();

        thisMonth.put("goal", goal);

        JSONObject balance = new JSONObject();
        balance.put("labels", days);
        balance.put("data", balancePerDay);
        thisMonth.put("balance", balance);

        JSONObject category = new JSONObject();
        category.put("labels", categories);
        category.put("data", categoryData);
        thisMonth.put("categories", category);

        JSONObject expenses = new JSONObject();
        expenses.put("lables", days);
        expenses.put("data", daylyExpenses);
        thisMonth.put("expenses", expenses);

        return thisMonth.toString();
    }
}
