package pl.edu.pw.bgtTracker.api.summaries;

import java.text.SimpleDateFormat;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;
import java.util.concurrent.ThreadLocalRandom;

import javax.sound.midi.SysexMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import pl.edu.pw.bgtTracker.db.entities.AppUser;
import pl.edu.pw.bgtTracker.db.entities.Expense;
import pl.edu.pw.bgtTracker.db.entities.ExpenseCategory;
import pl.edu.pw.bgtTracker.db.entities.Income;
import pl.edu.pw.bgtTracker.db.entities.IncomeCategory;
import pl.edu.pw.bgtTracker.db.repos.ExpenseRepository;
import pl.edu.pw.bgtTracker.db.repos.IncomeRepository;
import pl.edu.pw.bgtTracker.db.repos.UserRepository;

@RestController
@RequestMapping(value = { "/api/summary" })
public class SummariesController {

    @Autowired
    private ExpenseRepository expenseRepository;
    @Autowired
    private IncomeRepository incomeRepository;
    @Autowired
    private UserRepository userRepository;

    String[] months = { "January", "February", "March", "April", "May", "June", "July", "August", "September",
            "October", "November", "December" };

    @GetMapping(value = { "/" }, produces = MediaType.APPLICATION_JSON_VALUE)
    public String getUserExpanse(@RequestParam(value = "from", defaultValue = "2017-10-01") Long from,
            @RequestParam(value = "to", defaultValue = ("11111111111111")) Long to, Authentication auth) {
        System.out.println("from: " + from);
        System.out.println("to: " + to);
        AppUser user = userRepository.findByEmail(auth.getName());
        return getSummaryData(user, from, to).toString();
    }

    public JSONObject getSummaryData(AppUser user, Long from, Long to) {
        int goal = 30000;
        Date fromDate = new Date(from);
        Date toDate = new Date(to);
        System.out.println(fromDate.toString());
        System.out.println(toDate.toString());

        LocalDate fromLocal = LocalDate.from(fromDate.toInstant().atZone(ZoneId.of("GMT+1")));
        LocalDate toLocal = LocalDate.from(toDate.toInstant().atZone(ZoneId.of("GMT+1")));      

        int daysBetween = Math.toIntExact(ChronoUnit.DAYS.between(fromLocal, toLocal));
        daysBetween++; //cur we include to day into the days 


        List<Expense> allexpenses = expenseRepository.findByUserOrderByDateAsc(user);
        List<Income> allIncomes = incomeRepository.findByUserOrderByDateAsc(user);
        List<Expense> peridExpenses = new ArrayList<>();
        List<Income> periodIncomes = new ArrayList<>();

        List<ExpenseCategory> expenseCategories = user.getExpenseCategories();
        List<IncomeCategory> incomeCategories = user.getIncomeCategories();
        Map<Long, Long> expanseCategoiresWithAmoutns = new HashMap<>();
        Map<Long, Long> incomeCategoiresWithAmoutns = new HashMap<>();

        for(var ec : expenseCategories)
        {
            expanseCategoiresWithAmoutns.put(ec.getId(), 0L);
        }

        for(var ic: incomeCategories)
        {
            incomeCategoiresWithAmoutns.put(ic.getId(), 0L);
        }

        for(var e : allexpenses)
        {
            if(e.getDate().getTime()>=from && e.getDate().getTime() <= to)
            {
                System.out.println(e.getName());
                System.out.println(e.getDate());
                peridExpenses.add(e);
            }
        }

        for(var i : allIncomes)
        {
            if(i.getDate().getTime()>=from && i.getDate().getTime() <= to)
            {
                //System.out.println(i.getName());
                periodIncomes.add(i);
            }
        }

        long[] days = new long[daysBetween];
        long[] balancePerDay = new long[daysBetween];
        long[] incomes = new long[daysBetween];
        long[] daylyExpenses = new long[daysBetween];

        int expesesIndex = 0;
        int incomesIndex = 0;


        Calendar c = Calendar.getInstance(); 
        c.setTime(fromDate); 
        SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMdd");

        Date dateIteterator = c.getTime();

        JSONArray expansesArr = new JSONArray();
        JSONArray incomeArray = new JSONArray();

        for(int i = 0; i < daysBetween; i++)
        {
            dateIteterator = c.getTime();
            System.out.println(dateIteterator.toString());
            days[i] = c.getTime().getTime();
            if(expesesIndex < peridExpenses.size() && fmt.format(dateIteterator).equals(fmt.format(peridExpenses.get(expesesIndex).getDate())))
            {
                while(expesesIndex < peridExpenses.size() && fmt.format(dateIteterator).equals(fmt.format(peridExpenses.get(expesesIndex).getDate())))
                {
                    var e = peridExpenses.get(expesesIndex);
                    daylyExpenses[i] += e.getAmount();
                    expansesArr.add(e.toJSON());
                    long curAmount = expanseCategoiresWithAmoutns.get(e.getCategory().getId());
                    expanseCategoiresWithAmoutns.put(e.getCategory().getId(), curAmount+e.getAmount());
                    expesesIndex++;
                }
            } else 
            {
                daylyExpenses[i] = 0;
            }
            if(incomesIndex<periodIncomes.size() && fmt.format(dateIteterator).equals(fmt.format(periodIncomes.get(incomesIndex).getDate())))
            {
                while(incomesIndex<periodIncomes.size() && fmt.format(dateIteterator).equals(fmt.format(periodIncomes.get(incomesIndex).getDate())))
                {
                    var in = periodIncomes.get(incomesIndex);
                    incomes[i] += in.getAmount();
                    incomeArray.add(in.toJSON());
                    long curAmount = incomeCategoiresWithAmoutns.get(in.getCategory().getId());
                    incomeCategoiresWithAmoutns.put(in.getCategory().getId(), curAmount+in.getAmount());
                    incomesIndex++;
                }
            } else 
            {
                incomes[i] = 0;
            }
            balancePerDay[i] = incomes[i] - daylyExpenses[i];


            c.add(Calendar.DATE, 1);
        }


        String[] categoriesExpanse = new String[expenseCategories.size()];
        String[] expanseCategoriesColors =  new String[expenseCategories.size()];
        String[] categories = new String[expenseCategories.size()];
        long[] categoryData = new long[expenseCategories.size()];
        int i = 0;
        for(var cat: expenseCategories)
        {
            categoriesExpanse[i] = cat.getName(); 
            categories[i] = cat.getName();
            expanseCategoriesColors[i] = cat.getColor();
            categoryData[i] = expanseCategoiresWithAmoutns.get(cat.getId());
            i++;
        }

        String[] categoriesIncome = new String[incomeCategories.size()];
        long[] incomeCategoriesData = new long[incomeCategories.size()];
        String[] incomeCategoriesColors = new String[incomeCategories.size()];
        i = 0;
        for(var cat: incomeCategories)
        {
            categoriesIncome[i] = cat.getName();
            incomeCategoriesColors[i] = cat.getColor();
            incomeCategoriesData[i] = incomeCategoiresWithAmoutns.get(cat.getId());
            i++;
        }

        JSONObject data = new JSONObject();

        data.put("goal", goal);

        JSONObject balance = new JSONObject();
        balance.put("labels", days);
        balance.put("data", balancePerDay);
        data.put("BalanceData", balance);

        JSONObject category = new JSONObject();
        category.put("labels", categories);
        category.put("data", categoryData);
        category.put("colors", expanseCategoriesColors);
        data.put("CategoryData", category);

        JSONObject incomeCategory = new JSONObject();
        incomeCategory.put("labels", categoriesIncome);
        incomeCategory.put("data", incomeCategoriesData);
        incomeCategory.put("colors", incomeCategoriesColors);
        data.put("IncomesCategoryData", incomeCategory);

        JSONObject expenses = new JSONObject();
        expenses.put("labels", days);
        expenses.put("data", daylyExpenses);
        expenses.put("history", expansesArr);
        data.put("expenses", expenses);

        JSONObject incomesJ = new JSONObject();
        incomesJ.put("labels", days);
        incomesJ.put("data", incomes);
        incomesJ.put("history", incomeArray);
        data.put("incomes", incomesJ);

        return data;
    }

    // @GetMapping(value = {"/history"}, produces = MediaType.APPLICATION_JSON_VALUE)
    // public String getUserHistory(@RequestParam(value = "from", defaultValue = "2017-10-01") String from,
    //                              @RequestParam(value = "to", defaultValue = "2017-11-01") String to,
    //                              @RequestParam(value = "usrid", defaultValue = "1") String usrID) {
    //     System.out.println("get user history");
    //     System.out.println("from: " + from);
    //     System.out.println("to: " + to);
    //     System.out.println("userId: " + usrID);
    //     int userid = Integer.parseInt(usrID);
    //     return "XD";
    // }

    // public JSONObject getHistory(int userID, String from, String to) {
    //     JSONObject returVal = new JSONObject();

    //     return returVal;
    // }

}

