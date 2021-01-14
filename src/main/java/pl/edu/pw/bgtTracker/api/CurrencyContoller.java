package pl.edu.pw.bgtTracker.api;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import net.minidev.json.parser.ParseException;
import pl.edu.pw.bgtTracker.db.entities.AppUser;
import pl.edu.pw.bgtTracker.db.entities.Currency;
import pl.edu.pw.bgtTracker.db.repos.CurrencyRepository;
import pl.edu.pw.bgtTracker.db.repos.UserRepository;

@RestController
@RequestMapping(value = { "/api/currency"})
public class CurrencyContoller {

  @Autowired private UserRepository userRepository;
  @Autowired private CurrencyRepository currencyRepository;

  private String[] allCurrencies = {"CAD", "HKD", "ISK", "PHP", "DKK", "HUF", "CZK", "AUD", "RON", "SEK", "IDR", "INR", "BRL", "RUB", "HRK", "JPY", "THB", "CHF", "SGD", "PLN", "BGN", "TRY", "CNY", "NOK", "NZD", "ZAR", "USD", "MXN", "ILS", "GBP", "KRW", "MYR"};
  

  @GetMapping("/rates")
  public JSONObject getCurrecnyRates(Authentication auth)
  {
      AppUser user = userRepository.findByEmail(auth.getName()); 
      List<String> userCurrency = getUserCurrenctStrign(user);
      SimpleDateFormat fmt = new SimpleDateFormat("yyyy-MM-dd");

      //seting dates for querry
      Date endAt = Calendar.getInstance().getTime();
      Calendar cal = Calendar.getInstance();
      cal.set(Calendar.DAY_OF_MONTH, 1);
      Date startAt = cal.getTime();

      int daysBetween = endAt.getDate() - startAt.getDate();
      daysBetween++;

      
      
      //geting data form another server
      final String uri = "https://api.exchangeratesapi.io/history?start_at=" + fmt.format(startAt) +"&end_at=" + fmt.format(endAt);

      RestTemplate restTemplate = new RestTemplate();
      String result = restTemplate.getForObject(uri, String.class);

      JSONObject resultObject = (JSONObject) paresStringToJson(result).get("rates"); 

      JSONObject data = new JSONObject();
      
      List<Long> days = new ArrayList<>();

      //formating data 
      List<List<Double>> arrayOfRatesArray = new ArrayList<>();

      for(int i=0; i<userCurrency.size(); i++)
      {
        arrayOfRatesArray.add(new ArrayList<>());
      }

      for(int i = 0; i<daysBetween; i++)
      {
        Date curAt = cal.getTime();
        cal.add(Calendar.DATE, 1);

        JSONObject curDay = (JSONObject) resultObject.get(fmt.format(curAt));
        if(curDay == null)
        {
          continue;
        }
        for(int j=0; j<userCurrency.size(); j++)
        {
            arrayOfRatesArray.get(j).add((Double) curDay.get(userCurrency.get(j)));
        }

        days.add(curAt.getTime());

      }

      JSONArray series = new JSONArray();
      for(int i = 0; i < userCurrency.size(); i++)
      {
        JSONObject currency = new JSONObject();
        currency.put("name", userCurrency.get(i));
        currency.put("data", arrayOfRatesArray.get(i));
        series.add(currency);
      }
      
      data.put("series", series);
      data.put("days", days);

      return data;
  }

  private JSONObject paresStringToJson(String jsonString)
  {
    JSONParser parser = new JSONParser(JSONParser.MODE_JSON_SIMPLE);
    JSONObject body = new JSONObject();
    try {

        body = (JSONObject) parser.parse(jsonString);

    } catch (ParseException pe) {
        pe.printStackTrace();
    } catch (Exception e) {
        e.printStackTrace();
    }

    return body;
  }

  @GetMapping("/all")
  private String[] getAllCurrency()
  {
    return allCurrencies;
  }

  @GetMapping("/user")
  private List<String> getUserCurrencyContoler(Authentication auth)
  {
    AppUser user = userRepository.findByEmail(auth.getName());
    return getUserCurrenctStrign(user);
  }

  private List<Currency> getUserCurrency(AppUser user)
  {
    return user.getUserCurrencies();
  }

  private List<String> getUserCurrenctStrign(AppUser user)
  {
    List<Currency> userCurrencies = user.getUserCurrencies();
    List<String> toReturn = new ArrayList<>();
    for(var c : userCurrencies)
    {
      toReturn.add(c.getName());
    }
    return toReturn;
  }

  @GetMapping("/lefttoadd")
  private List<String> getLeftCurrencyContoler(Authentication auth)
  {
    AppUser user = userRepository.findByEmail(auth.getName());
    return getLeftCurrency(user);
  }

  private List<String> getLeftCurrency(AppUser user)
  {
    List<String> currentUserCurrencies = getUserCurrenctStrign(user);
    List<String> leftCurrencies = new ArrayList<>();
    for(var c: allCurrencies)
    {
      if(!currentUserCurrencies.contains(c))
      {
        leftCurrencies.add(c);
      }
    }

    return leftCurrencies;
  }

  @GetMapping(value = "/userSummary", produces = MediaType.APPLICATION_JSON_VALUE)
  private JSONObject getUserSummary(Authentication auth)
  {
    AppUser user = userRepository.findByEmail(auth.getName());
    JSONObject data = new JSONObject();
    data.put("user", getUserCurrenctStrign(user));
    data.put("left", getLeftCurrency(user));
    return data;
  }

  @PostMapping("/user")
  private void setCurrencies(Authentication auth, @RequestBody String newCurrenciesBody)
  {
    AppUser user = userRepository.findByEmail(auth.getName());
   
    newCurrenciesBody = newCurrenciesBody.substring(1, newCurrenciesBody.length()-1);

    List<String> newCurrenciesWithQuotes = new ArrayList<>(Arrays.asList(newCurrenciesBody.split("\\s*,\\s*")));
    List<String> newCurrencies = new ArrayList<>();
    for(var nc : newCurrenciesWithQuotes)
    {
      newCurrencies.add(nc.substring(1, nc.length()-1));
    }
    
    List<Currency> currentUserCurrencies = user.getUserCurrencies();
    List<Currency> toDelete = new ArrayList<>();
    
    for(var c: currentUserCurrencies)
    {
      if(!newCurrencies.contains(c.getName()))
      {
        toDelete.add(c);
      }
      else
      {
        newCurrencies.remove(c.getName());
      }
    }

    for(var nc: newCurrencies)
    {
      Currency newCurrecny = new Currency();
      newCurrecny.setName(nc);
      newCurrecny.setUser(user);
      currencyRepository.save(newCurrecny);
    }

    for(var dc: toDelete)
    {
      currencyRepository.delete(dc);
    }

    
  }
  
}
