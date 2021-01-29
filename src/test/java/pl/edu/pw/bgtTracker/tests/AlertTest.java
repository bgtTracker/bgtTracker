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
import pl.edu.pw.bgtTracker.db.entities.Alert;
import pl.edu.pw.bgtTracker.db.entities.Bank;
import pl.edu.pw.bgtTracker.db.entities.BankAccount;
import pl.edu.pw.bgtTracker.db.repos.AlertRepository;
import pl.edu.pw.bgtTracker.db.repos.BankAccountRepository;
import pl.edu.pw.bgtTracker.db.repos.UserRepository;

import static org.hamcrest.Matchers.*;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.ResultMatcher.*;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
@ExtendWith(RegisterUserExtension.class)
@Transactional
public class AlertTest {
  @Autowired private UserRepository users;
  @Autowired private AlertRepository repository;
  @Autowired private NotificationsService notificationsService;
  @Autowired private MockMvc mvc;
  private Alert alert;
  
  @BeforeEach
  public void setUp(){
    var user = users.findByEmail("test@test.test");
    alert = new Alert();
    alert.setLevel("warning");
    alert.setTitle("test");
    alert.setContent("testContent");
    alert.setUser(user);
  }

  @Test
  @WithMockUser("test@test.test")
  public void testGet() throws Exception {
    repository.saveAndFlush(alert);
      mvc.perform(get("/api/getNotifications")
              .contentType(MediaType.APPLICATION_JSON)
      ).andExpect(matchAll(
              status().isOk(),
              jsonPath("$.notifications", hasSize(1))
      ));
  }

  @Test
  @WithMockUser("test@test.test")
  public void testRead() throws Exception {
    Long id = repository.saveAndFlush(alert).getId();
    mvc.perform(post("/api/notificationsread")
        .param("id", id.toString())
      ).andExpect(matchAll(
          status().isOk()
      ));

      mvc.perform(get("/api/getNotifications")
              .contentType(MediaType.APPLICATION_JSON)
      ).andExpect(matchAll(
              status().isOk(),
              jsonPath("$.notifications", hasSize(0))
      ));
  }


}
