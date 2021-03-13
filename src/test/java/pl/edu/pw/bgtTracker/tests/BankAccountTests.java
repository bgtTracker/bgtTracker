package pl.edu.pw.bgtTracker.tests;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import pl.edu.pw.bgtTracker.db.entities.Bank;
import pl.edu.pw.bgtTracker.db.entities.BankAccount;
import pl.edu.pw.bgtTracker.db.repos.BankAccountRepository;
import pl.edu.pw.bgtTracker.db.repos.UserRepository;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.ResultMatcher.*;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
@ExtendWith(RegisterUserExtension.class)
@Transactional
public class BankAccountTests {
    private static final ObjectMapper mapper = new ObjectMapper();
    @Autowired private MockMvc mvc;
    @Autowired private BankAccountRepository repository;
    @Autowired private UserRepository users;
    private BankAccount testAccount;

    @BeforeEach
    public void setupEach() {
        var user = users.findByEmail("test@test.test");

        var bank = new Bank();
        bank.setName("Test Bank");
        bank.setUser(user);

        testAccount = new BankAccount();
        testAccount.setNumber("11111111111111111111111111");
        testAccount.setBalance(123456);
        testAccount.setActive(true);
        testAccount.setBank(bank);
        testAccount.setUser(user);
    }

    @Test
    @WithMockUser("test@test.test")
    public void testCreate() throws Exception {
        mvc.perform(post("/api/bank-accounts")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(testAccount))
        ).andExpect(matchAll(
                status().isOk(),
                jsonPath("$.id", is(not(0)))
        ));
    }

    @Test
    @WithMockUser("test@test.test")
    public void testGetAll() throws Exception {
        repository.save(testAccount);

        mvc.perform(get("/api/bank-accounts"))
                .andExpect(matchAll(
                        status().isOk(),
                        jsonPath("$", hasSize(1))
                ));
    }

    @Test
    @WithMockUser("test@test.test")
    public void testGetOne() throws Exception {
        var acc = repository.save(testAccount);

        mvc.perform(get("/api/bank-accounts/" + acc.getId()))
                .andExpect(matchAll(
                        status().isOk(),
                        jsonPath("$.id", is(acc.getId().intValue()))
                ));
    }

    @Test
    @WithMockUser("test@test.test")
    public void testSet() throws Exception {
        var acc = repository.save(testAccount);
        acc.setBalance(11111);

        mvc.perform(put("/api/bank-accounts/" + acc.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(acc))
        ).andExpect(status().isOk());

        mvc.perform(get("/api/bank-accounts/" + acc.getId()))
                .andExpect(matchAll(
                        status().isOk(),
                        jsonPath("$.balance", is(11111))
                ));
    }

    @Test
    @WithMockUser("test@test.test")
    public void testDelete() throws Exception {
        var acc = repository.save(testAccount);

        mvc.perform(delete("/api/bank-accounts/" + acc.getId()))
                .andExpect(status().isOk());

        mvc.perform(get("/api/bank-accounts"))
                .andExpect(matchAll(
                        status().isOk(),
                        jsonPath("$", hasSize(0))
                ));
    }
}
