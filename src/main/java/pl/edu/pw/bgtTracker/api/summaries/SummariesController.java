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

    public enum PossiblePeriods {
        data,
    }

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
                // System.out.println(e.getName());
                // System.out.println(e.getDate());
                //System.out.println(e.getName());
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
        String[] expanseCategoriesColor =  new String[expenseCategories.size()];
        String[] categories = new String[expenseCategories.size()];
        long[] categoryData = new long[expenseCategories.size()];
        int i = 0;
        for(var cat: expenseCategories)
        {
            categoriesExpanse[i] = cat.getName(); 
            categories[i] = cat.getName();
            expanseCategoriesColor[i] = cat.getColor();
            categoryData[i] = expanseCategoiresWithAmoutns.get(cat.getId());
            i++;
        }

        String[] categoriesIncome = new String[incomeCategories.size()];
        long[] incomeCategoriesData = new long[incomeCategories.size()];
        i = 0;
        for(var cat: incomeCategories)
        {
            categoriesIncome[i] = cat.getName();
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
        data.put("CategoryData", category);

        JSONObject incomeCategory = new JSONObject();
        incomeCategory.put("labels", categoriesIncome);
        incomeCategory.put("data", incomeCategoriesData);
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

        System.out.println(data.toJSONString());
        return data;
    }


    public JSONObject getTestSummaryData(AppUser user, Long from, Long to) {
        int goal = 30000;
        long[] days = new long[31];
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.YEAR, 2020);
        cal.set(Calendar.MONTH, 11);
        int[] balancePerDay = new int[31];
        // = {886, -279, -237, -886, -168, -159, 1245, 1991, 337, 1714, -223, 1717, 386, 252, -546, 1832, 592, -879, 1071, -908, -89, 1118, 1211, -823, 810, 1189, 1263, 377, 999, 1103};
        int[] incomes = new int[31];
        String[] categoriesExpanse = {"Food", "Home", "Car", "Commute", "Luxuries"};
        String[] categoriesIncome = {"Work", "Investments", "Allegor"};
        String[] categories = {"Food", "Home", "Car", "Commute", "Luxuries"};
        int[] categoryData = {0, 0, 0, 0, 0};
        int[] incomeCategoriesData = {0, 0, 0};

        int[] daylyExpenses = new int[31];
        // = {1814, 500, 1605, 822, 299, 991, 1307, 53, 138, 881, 869, 1325, 936, 93, 1795, 1766, 1219, 1379, 313, 752, 867, 859, 448, 610, 990, 1739, 750, 470, 593, 446};


        // int [] yearlyExpenses = {3000, 3000, 4000, 5000, 1200, 3000, 5000, 3000, 4032, 5255, 3232, 3131};


        JSONObject data = new JSONObject();

        cal.set(Calendar.YEAR, 2020);
        cal.set(Calendar.MONTH, 11);

        JSONArray expansesArr = new JSONArray();
        for (int i = 0; i < 31; i++) {
            cal.set(Calendar.DAY_OF_MONTH, i + 1);
            long day = cal.getTime().getTime();
            int amount = ThreadLocalRandom.current().nextInt(10, 1501);
            int catIndex = ThreadLocalRandom.current().nextInt(0, categoriesExpanse.length);
            categoryData[catIndex] += amount;
            daylyExpenses[i] = amount;
            days[i] = day;
            JSONObject ob = new JSONObject();
            ob.put("Amount", amount);
            ob.put("Date", day);
            ob.put("Name", "Expanse Test" + i);
            ob.put("Category", categoriesExpanse[catIndex]);
            expansesArr.add(ob);
        }

        JSONArray incomeArray = new JSONArray();
        for (int i = 0; i < 31; i++) {
            int amount = 0;
            if (ThreadLocalRandom.current().nextInt(0, 100) > 90) {
                cal.set(Calendar.DAY_OF_MONTH, i + 1);
                amount = ThreadLocalRandom.current().nextInt(300, 4000);
                int incomeCatIndex = ThreadLocalRandom.current().nextInt(0, categoriesIncome.length);
                incomeCategoriesData[incomeCatIndex] += amount;
                incomes[i] = amount;
                JSONObject ob = new JSONObject();
                ob.put("Amount", amount);
                ob.put("Date", cal.getTime().getTime());
                ob.put("Name", "Income Test" + i);
                ob.put("Category", categoriesIncome[incomeCatIndex]);
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

        JSONObject incomeCategory = new JSONObject();
        incomeCategory.put("labels", categoriesIncome);
        incomeCategory.put("data", incomeCategoriesData);
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

    @GetMapping(value = {"/history"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public String getUserHistory(@RequestParam(value = "from", defaultValue = "2017-10-01") String from,
                                 @RequestParam(value = "to", defaultValue = "2017-11-01") String to,
                                 @RequestParam(value = "usrid", defaultValue = "1") String usrID) {
        System.out.println("get user history");
        System.out.println("from: " + from);
        System.out.println("to: " + to);
        System.out.println("userId: " + usrID);
        int userid = Integer.parseInt(usrID);
        return "XD";
    }

    public JSONObject getHistory(int userID, String from, String to) {
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

