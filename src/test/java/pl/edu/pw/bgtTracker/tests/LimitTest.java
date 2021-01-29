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

import pl.edu.pw.bgtTracker.api.notifications.NotificationsService;
import pl.edu.pw.bgtTracker.api.objectives.ObjectivesService;
import pl.edu.pw.bgtTracker.db.entities.Alert;
import pl.edu.pw.bgtTracker.db.entities.AppUser;
import pl.edu.pw.bgtTracker.db.entities.Bank;
import pl.edu.pw.bgtTracker.db.entities.BankAccount;
import pl.edu.pw.bgtTracker.db.entities.ExpenseCategory;
import pl.edu.pw.bgtTracker.db.entities.Objective;
import pl.edu.pw.bgtTracker.db.repos.AlertRepository;
import pl.edu.pw.bgtTracker.db.repos.BankAccountRepository;
import pl.edu.pw.bgtTracker.db.repos.ExpenseCategoryRepository;
import pl.edu.pw.bgtTracker.db.repos.ObjectiveRepository;
import pl.edu.pw.bgtTracker.db.repos.UserRepository;

import static org.hamcrest.Matchers.*;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.io.IOException;
import java.util.Date;

import static org.springframework.test.web.servlet.ResultMatcher.*;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
@ExtendWith(RegisterUserExtension.class)
@Transactional
public class LimitTest {
  @Autowired private UserRepository users;
  @Autowired private UserRepository userRepository;
  @Autowired private MockMvc mvc;
  Integer limit = 450000;

  @BeforeEach
  public void setUp(){
    AppUser user = userRepository.findByEmail("test@test.test");
    user.setUserLimit(limit);
  }

  @Test
  @WithMockUser("test@test.test")
  public void getLimit() throws Exception{
    var result = mvc.perform(get("/api/limit")
            .contentType(MediaType.APPLICATION_JSON)
    ).andExpect(matchAll(
        status().isOk(),
        content().string(limit.toString())
    ));
  }

  @Test
  @WithMockUser("test@test.test")
  public void setLimit() throws Exception{
    Integer newLimit = 400000;
    var result = mvc.perform(put("/api/limit")
            .contentType(MediaType.APPLICATION_JSON)
            .content(Integer.toString(newLimit))
    ).andExpect(matchAll(
        status().isOk()
    ));

    assert(userRepository.findByEmail("test@test.test").getUserLimit() == newLimit);
  }
}
