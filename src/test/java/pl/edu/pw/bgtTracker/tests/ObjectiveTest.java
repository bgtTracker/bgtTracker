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
public class ObjectiveTest {
  @Autowired private ObjectiveRepository repository;
  @Autowired private ObjectivesService service;
  @Autowired private UserRepository users;
  @Autowired private ExpenseCategoryRepository expenseCategory;
  @Autowired private UserRepository userRepository;
  @Autowired private MockMvc mvc;
  private Objective testObjective;
  private ExpenseCategory category;

  @BeforeEach
  public void setUp(){
    AppUser user = userRepository.findByEmail("test@test.test");
    category = new ExpenseCategory();
    category.setName("testCat");
    category.setUser(user);
    expenseCategory.save(category);

    testObjective = new Objective();
    testObjective.setAmount(100000);
    testObjective.setPriority(100);
    testObjective.setDate(new Date());
    testObjective.setDescription("testDescription");
    testObjective.setName("test");
    testObjective.setCategory(category);
    testObjective.setUser(user);
  }

  @Test
  @WithMockUser("test@test.test")
  public void addObjectiveTest() throws Exception{
    var result = mvc.perform(post("/api/addobjective")
            .contentType(MediaType.APPLICATION_JSON)
            .content(testObjective.toJSON().toString())
    ).andExpect(matchAll(
        status().isOk(),
        jsonPath("$.id", is(not(0))),
        jsonPath("$.name", is(testObjective.getName()))
    ));
  }

  @Test
  @WithMockUser("test@test.test")
  public void getAllObjectivesTest() throws Exception{
    Objective objective = repository.save(testObjective);
    String[] nameRes = {objective.getName()};
    var result = mvc.perform(get("/api/getobjectives")
        .contentType(MediaType.APPLICATION_JSON)
    ).andExpect(matchAll(
    status().isOk(),
    jsonPath("$.objectives.[?(@.id == "+ objective.getId()+")].name", containsInAnyOrder(objective.getName())),
    jsonPath("$.objectives.[?(@.id == "+ objective.getId()+")].amount", is(containsInAnyOrder(100000)))
    ));

  }

  @Test
  @WithMockUser("test@test.test")
  public void deleteObjective()throws Exception {
    ObjectMapper objectMapper = new ObjectMapper();
    Objective copyObjective = objectMapper.readValue(objectMapper.writeValueAsString(testObjective), Objective.class);
    copyObjective =  repository.save(copyObjective);

    var result = mvc.perform(delete("/api/deleteobjective?id="+copyObjective.getId())
    ).andExpect(matchAll(
      status().isOk()));

    assert(repository.findById(copyObjective.getId()).isPresent() == false);
  }

  // @Test
  // @WithMockUser("test@test.test")
  // public void confirmObjective(){
    
  // }

  @Test
  @WithMockUser("test@test.test")
  public void editObjective() throws Exception{
    repository.save(testObjective);
    testObjective.setName("testEdited");
    testObjective.setAmount(150000);

    var result = mvc.perform(put("/api/editobjective")
            .contentType(MediaType.APPLICATION_JSON)
            .content(testObjective.toJSON().toString())
    ).andExpect(matchAll(
          status().isOk()));

    var resultGet = mvc.perform(get("/api/getobjectives")
          .contentType(MediaType.APPLICATION_JSON)
          .content(testObjective.toJSON().toString())
    ).andExpect(matchAll(
        status().isOk(),
        jsonPath("$.objectives.[?(@.id == "+ testObjective.getId()+")].name", containsInAnyOrder("testEdited")),
        jsonPath("$.objectives.[?(@.id == "+ testObjective.getId()+")].amount", containsInAnyOrder(150000))
    ));

    
  }
}
