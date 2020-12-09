package pl.edu.pw.bgtTracker.summaries;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

import com.fasterxml.jackson.core.JsonFactoryBuilder;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;

import pl.edu.pw.bgtTracker.db.entities.*;

@RestController
@RequestMapping(value = {"/testapi/summary"})
public class SummariesController {
    
    public enum PossiblePeriods {
        data, 
    }

    String[] months = {"January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"};

    @GetMapping(value = {"/"}, produces=MediaType.APPLICATION_JSON_VALUE)
    public String getUserExpanse(@RequestParam(value = "from", defaultValue="2017-10-01") String from, 
    @RequestParam(value = "to", defaultValue=("11111111111111")) String to,
    @RequestParam(value = "usrid", defaultValue="1") String usrID)
    {
        System.out.println("from: " + from.toString());
        System.out.println("to: " + to.toString());
        System.out.println("userId: " + usrID);
        int userid = Integer.parseInt(usrID);
        return getSummaryData(userid, from, to).toString();
    }

    public JSONObject getSummaryData(int userID, String from, String to)
    {
        int goal = 30000;
        long [] days = new long[31];
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.YEAR, 2020);
        cal.set(Calendar.MONTH, 11);
        // for(int i = 0; i < 31; i++)
        // {
        //     cal.set(Calendar.DAY_OF_MONTH, i+1);
        //     days[i] = cal.getTime().getTime();
        // }
        int[] balancePerDay = new int[31]; 
        // = {886, -279, -237, -886, -168, -159, 1245, 1991, 337, 1714, -223, 1717, 386, 252, -546, 1832, 592, -879, 1071, -908, -89, 1118, 1211, -823, 810, 1189, 1263, 377, 999, 1103};
        int[] incomes = new int[31];
        String[] categories = {"Food", "Home", "Car", "Commute", "Luxuries"};
        int[] categoryData = {1000, 400, 500, 150, 400};

        int [] daylyExpenses = new int[31]; 
        // = {1814, 500, 1605, 822, 299, 991, 1307, 53, 138, 881, 869, 1325, 936, 93, 1795, 1766, 1219, 1379, 313, 752, 867, 859, 448, 610, 990, 1739, 750, 470, 593, 446};


        // int [] yearlyExpenses = {3000, 3000, 4000, 5000, 1200, 3000, 5000, 3000, 4032, 5255, 3232, 3131};
        

        JSONObject data = new JSONObject();

        cal.set(Calendar.YEAR, 2020);
        cal.set(Calendar.MONTH, 11);

        JSONArray expansesArr= new JSONArray();
        for(int i = 0; i < 31; i++)
        {
            cal.set(Calendar.DAY_OF_MONTH, i+1);
            long day = cal.getTime().getTime();
            int amount = ThreadLocalRandom.current().nextInt(10, 1501);
            daylyExpenses[i] = amount;
            days[i] = day;
            JSONObject ob = new JSONObject();
            ob.put("Amount", amount);
            ob.put("Date", day);
            ob.put("Name", "Expanse Test" + i);
            expansesArr.add(ob);
        }

        JSONArray incomeArray= new JSONArray();
        for(int i = 0; i < 31; i++)
        {
            int amount = 0;
            if(ThreadLocalRandom.current().nextInt(0, 100) > 90)
            {
                cal.set(Calendar.DAY_OF_MONTH, i+1);
                amount = ThreadLocalRandom.current().nextInt(300, 4000);
                incomes[i] = amount;
                JSONObject ob = new JSONObject();
                ob.put("Amount", amount);
                ob.put("Date", cal.getTime().getTime());
                ob.put("Name", "Income Test" + i);
                incomeArray.add(ob);
            }
                balancePerDay[i] = amount - daylyExpenses[i];
        }

        data.put("goal", goal);

        JSONObject balance = new JSONObject();
        balance.put("labels", days);
        balance.put("data", balancePerDay);
        data.put("BalanceData", balance);

        JSONObject category = new JSONObject();
        category.put("labels", categories);
        category.put("data", categoryData);
        data.put("CategoryData", category);

        JSONObject expenses = new JSONObject();
        expenses.put("labels", days);
        expenses.put("data", daylyExpenses);
        expenses.put("history", expansesArr);
        data.put("expenses", expenses);

        JSONObject incomesJ = new JSONObject();
        incomesJ.put("lables", days);
        incomesJ.put("data", incomes);
        incomesJ.put("history", incomeArray);
        data.put("incomes", incomesJ);

        return data;
    }

    @GetMapping(value = {"/history"}, produces=MediaType.APPLICATION_JSON_VALUE)
    public String getUserHistory(@RequestParam(value = "from", defaultValue="2017-10-01") String from, 
    @RequestParam(value = "to", defaultValue="2017-11-01") String to,
    @RequestParam(value = "usrid", defaultValue="1") String usrID)
    {
        System.out.println("get user history");
        System.out.println("from: " + from);
        System.out.println("to: " + to);
        System.out.println("userId: " + usrID);
        int userid = Integer.parseInt(usrID);
        return getSummaryData(userid, from, to).toString();
    }

    public JSONObject getHistory(int userID, String from, String to)
    {
        JSONObject returVal = new JSONObject();

        return returVal;
    }

    // private Expense createExpense(int amount, long date, String name)
    // {
    //     Expense exp1 = new Expense();
    //     exp1.setamount(amount);
    //     exp1.setdate(new Date(date));
    //     exp1.setname(name);
    //     return exp1;
    // }
}

