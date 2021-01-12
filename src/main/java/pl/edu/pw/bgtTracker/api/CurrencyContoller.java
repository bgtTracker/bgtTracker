package pl.edu.pw.bgtTracker.api;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import net.minidev.json.parser.ParseException;
import pl.edu.pw.bgtTracker.db.entities.AppUser;
import pl.edu.pw.bgtTracker.db.repos.UserRepository;

@RestController
@RequestMapping(value = { "/api/currency"})
public class CurrencyContoller {

  @Autowired private UserRepository userRepository;
  
  @GetMapping
  public JSONObject getCurrecnyRates(Authentication auth)
  {
      AppUser user = userRepository.findByEmail(auth.getName()); 
      List<String> userCurrency = List.of("PLN", "PHP", "USD", "GBP");
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
      System.out.println(resultObject.toJSONString());
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
  
}
