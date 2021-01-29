package pl.edu.pw.bgtTracker.tests;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import pl.edu.pw.bgtTracker.api.CurrencyContoller;
import pl.edu.pw.bgtTracker.api.notifications.NotificationsService;
import pl.edu.pw.bgtTracker.api.objectives.ObjectivesService;
import pl.edu.pw.bgtTracker.db.entities.Alert;
import pl.edu.pw.bgtTracker.db.entities.AppUser;
import pl.edu.pw.bgtTracker.db.entities.Bank;
import pl.edu.pw.bgtTracker.db.entities.BankAccount;
import pl.edu.pw.bgtTracker.db.entities.Currency;
import pl.edu.pw.bgtTracker.db.entities.ExpenseCategory;
import pl.edu.pw.bgtTracker.db.entities.Objective;
import pl.edu.pw.bgtTracker.db.repos.AlertRepository;
import pl.edu.pw.bgtTracker.db.repos.BankAccountRepository;
import pl.edu.pw.bgtTracker.db.repos.CurrencyRepository;
import pl.edu.pw.bgtTracker.db.repos.ExpenseCategoryRepository;
import pl.edu.pw.bgtTracker.db.repos.ObjectiveRepository;
import pl.edu.pw.bgtTracker.db.repos.UserRepository;

import static org.hamcrest.Matchers.*;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.springframework.test.web.servlet.ResultMatcher.*;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
@ExtendWith(RegisterUserExtension.class)
@Transactional
public class CurrencyTest {
  @Autowired private UserRepository userRepository;
  @Autowired private CurrencyRepository currencyRepository;
  @Autowired private MockMvc mvc;
  AppUser user;
  Currency c;
  Currency c2;
  String[] currencies = {"PLN", "USD"};
  String[] allCurrencies = {"CAD", "HKD", "ISK", "PHP", "DKK", "HUF", "CZK", "AUD", "RON", "SEK", "IDR", "INR", "BRL", "RUB", "HRK", "JPY", "THB", "CHF", "SGD", "PLN", "BGN", "TRY", "CNY", "NOK", "NZD", "ZAR", "USD", "MXN", "ILS", "GBP", "KRW", "MYR"};
  String[] left = {"CAD", "HKD", "ISK", "PHP", "DKK", "HUF", "CZK", "AUD", "RON", "SEK", "IDR", "INR", "BRL", "RUB", "HRK", "JPY", "THB", "CHF", "SGD", "BGN", "TRY", "CNY", "NOK", "NZD", "ZAR", "MXN", "ILS", "GBP", "KRW", "MYR"};

  @BeforeEach
  public void setUp(){
      user = userRepository.findByEmail("test@test.test");
      c = new Currency();
      c.setName("PLN");
      c.setUser(user);
      c2 = new Currency();
      c2.setName("USD");
      c2.setUser(user);
  }


  @Test
  @WithMockUser("test@test.test")
  public void getAll() throws Exception{
    var result = mvc.perform(get("/api/currency/all")
            .contentType(MediaType.APPLICATION_JSON)
    ).andExpect(matchAll(
        status().isOk(),
        jsonPath("@", containsInAnyOrder(allCurrencies))
    ));
  }

}
