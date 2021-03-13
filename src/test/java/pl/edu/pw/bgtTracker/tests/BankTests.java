package pl.edu.pw.bgtTracker.tests;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
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
import pl.edu.pw.bgtTracker.db.repos.BankRepository;
import pl.edu.pw.bgtTracker.db.repos.UserRepository;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.ResultMatcher.matchAll;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
@ExtendWith(RegisterUserExtension.class)
@Transactional
public class BankTests {
    private static final ObjectMapper mapper = new ObjectMapper();
    @Autowired private MockMvc mvc;
    @Autowired private BankRepository repository;
    @Autowired private UserRepository users;
    private Bank testBank;

    @BeforeEach
    public void setupEach() {
        var user = users.findByEmail("test@test.test");

        testBank = new Bank();
        testBank.setName("Test Bank");
        testBank.setUser(user);
    }

    @Test
    @WithMockUser("test@test.test")
    public void testCreate() throws Exception {
        mvc.perform(post("/api/banks")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(testBank))
        ).andExpect(matchAll(
                status().isOk(),
                jsonPath("$.id", is(not(0)))
        ));
    }

    @Test
    @WithMockUser("test@test.test")
    public void testGetAll() throws Exception {
        var user = users.findByEmail("test@test.test");

        var anotherBank = new Bank();
        anotherBank.setName("Another Bank");
        anotherBank.setUser(user);

        repository.save(testBank);
        repository.save(anotherBank);

        mvc.perform(get("/api/banks"))
                .andExpect(matchAll(
                        status().isOk(),
                        jsonPath("$", hasSize(2))
                ));
    }

    @Test
    @WithMockUser("test@test.test")
    public void testGetOne() throws Exception {
        var acc = repository.save(testBank);

        mvc.perform(get("/api/banks/" + acc.getId()))
                .andExpect(matchAll(
                        status().isOk(),
                        jsonPath("$.id", is(acc.getId().intValue()))
                ));
    }

    @Test
    @WithMockUser("test@test.test")
    public void testSet() throws Exception {
        var acc = repository.save(testBank);
        acc.setName("Modified Test Bank");

        mvc.perform(put("/api/banks/" + acc.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(acc))
        ).andExpect(status().isOk());

        mvc.perform(get("/api/banks/" + acc.getId()))
                .andExpect(matchAll(
                        status().isOk(),
                        jsonPath("$.name", is("Modified Test Bank"))
                ));
    }

    @Test
    @WithMockUser("test@test.test")
    public void testDelete() throws Exception {
        var acc = repository.save(testBank);

        mvc.perform(delete("/api/banks/" + acc.getId()))
                .andExpect(status().isOk());

        mvc.perform(get("/api/banks"))
                .andExpect(matchAll(
                        status().isOk(),
                        jsonPath("$", hasSize(0))
                ));
    }
}
