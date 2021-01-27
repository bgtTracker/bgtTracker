package pl.edu.pw.bgtTracker.tests;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;
import pl.edu.pw.bgtTracker.db.entities.Bank;
import pl.edu.pw.bgtTracker.db.entities.BankAccount;
import pl.edu.pw.bgtTracker.db.repos.BankAccountRepository;

import static org.hamcrest.Matchers.*;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.ResultMatcher.*;

@SpringBootTest
@ActiveProfiles("test")
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@Transactional
public class BankAccountTests {
    @Autowired private WebApplicationContext context;
    @Autowired private BankAccountRepository repository;
    private MockMvc mvc;
    private BankAccount testAccount;

    @BeforeAll
    public void setup() {
        mvc = MockMvcBuilders
                .webAppContextSetup(context)
                .apply(springSecurity())
                .build();

        var bank = new Bank();
        bank.setName("Test Bank");

        testAccount = new BankAccount();
        testAccount.setNumber("11111111111111111111111111");
        testAccount.setBalance(123456);
        testAccount.setActive(true);
        testAccount.setBank(bank);
    }

    @Test
    @WithMockUser("test@test.test")
    public void testCreate() throws Exception {
        var result = mvc.perform(post("/api/bank-accounts")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(testAccount))
        ).andExpect(matchAll(
                status().isOk(),
                jsonPath("$.id", is(not(0))),
                jsonPath("$.user.email", is(SecurityContextHolder.getContext().getAuthentication().getName()))
        ));

//        var retAccount = new ObjectMapper().readValue(result.getResponse().getContentAsString(), BankAccount.class);
//
//        Assertions.assertNotEquals(0, retAccount.getId());
//        Assertions.assertEquals(SecurityContextHolder.getContext().getAuthentication().getName(), retAccount.getUser().getEmail());
    }

    @Test
    @WithMockUser("test@test.test")
    public void testGetAll() throws Exception {
        repository.save(testAccount);
        repository.save(testAccount);

        mvc.perform(get("/api/bank-accounts"))
                .andExpect(matchAll(
                        status().isOk(),
                        jsonPath("$", hasSize(2))
                ));
    }

    @Test
    @WithMockUser("test@test.test")
    public void testGetOne() throws Exception {
        var acc = repository.save(testAccount);

        mvc.perform(get("/api/bank-accounts/" + acc.getId()))
                .andExpect(matchAll(
                        status().isOk(),
                        jsonPath("$.id", is(acc.getId()))
                ));
    }

    @Test
    @WithMockUser("test@test.test")
    public void testSet() throws Exception {
        var acc = repository.save(testAccount);
    }

    @Test
    @WithMockUser("test@test.test")
    public void testDelete() throws Exception {

    }
}
