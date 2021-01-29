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
import org.springframework.transaction.annotation.Transactional;
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
  @Autowired private CurrencyService currencyService;

  private String[] allCurrencies = {"CAD", "HKD", "ISK", "PHP", "DKK", "HUF", "CZK", "AUD", "RON", "SEK", "IDR", "INR", "BRL", "RUB", "HRK", "JPY", "THB", "CHF", "SGD", "PLN", "BGN", "TRY", "CNY", "NOK", "NZD", "ZAR", "USD", "MXN", "ILS", "GBP", "KRW", "MYR"};
  

  /**
   * Returns currency rates for a given user
   * @param auth
   * @return
   */
  @GetMapping("/rates")
  public JSONObject getCurrecnyRates(Authentication auth)
  {
      AppUser user = userRepository.findByEmail(auth.getName()); 
      return currencyService.getCurrecnyRates(user);
  }


  /**
   * Returns all available currencies
   * @return
   */
  @GetMapping("/all")
  private String[] getAllCurrency()
  {
    return allCurrencies;
  }

  /**
   * Returns user's currencies
   * @param auth
   * @return
   */
  @GetMapping("/user")
  private List<String> getUserCurrencyContoler(Authentication auth)
  {
    AppUser user = userRepository.findByEmail(auth.getName());
    return currencyService.getUserCurrenctStrign(user);
  }


  /**
   * Returns user Currencies in a List of strings
   * @param user 
   */


  /**
   * Returns currencies that are available but user hasn't added them yet
   * @param auth 
   */
  @GetMapping("/lefttoadd")
  private List<String> getLeftCurrencyContoler(Authentication auth)
  {
    AppUser user = userRepository.findByEmail(auth.getName());
    return currencyService.getLeftCurrency(user);
  }



  /**
   * Returns user and left currencies 
   * @param auth
   * @return JSON
   */
  @GetMapping(value = "/userSummary", produces = MediaType.APPLICATION_JSON_VALUE)
  private JSONObject getUserSummary(Authentication auth)
  {
    AppUser user = userRepository.findByEmail(auth.getName());
    JSONObject data = new JSONObject();
    data.put("user", currencyService.getUserCurrenctStrign(user));
    data.put("left", currencyService.getLeftCurrency(user));
    return data;
  }

  /**
   * Set new currencies for a user
   * @param auth
   * @param newCurrenciesBody
   */
  @Transactional
  @PostMapping("/user")
  private void setCurrencies(Authentication auth, @RequestBody String newCurrenciesBody)
  {
    AppUser user = userRepository.findByEmail(auth.getName());

    currencyService.setCurrencies(user, newCurrenciesBody);
  }
}
