package pl.edu.pw.bgtTracker.tests;

import net.minidev.json.JSONArray;
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
import pl.edu.pw.bgtTracker.db.entities.Income;
import pl.edu.pw.bgtTracker.db.entities.IncomeCategory;
import pl.edu.pw.bgtTracker.db.repos.IncomeCategoryRepository;
import pl.edu.pw.bgtTracker.db.repos.IncomeRepository;
import pl.edu.pw.bgtTracker.db.repos.UserRepository;

import java.util.Date;

import static org.hamcrest.Matchers.*;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.ResultMatcher.matchAll;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
@ExtendWith(RegisterUserExtension.class)
@Transactional
public class IncomeTests {
    @Autowired private MockMvc mvc;
    @Autowired private IncomeRepository incomeRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private IncomeCategoryRepository incomeCategoryRepository;

    private Income testIncome;
    private IncomeCategory testIncomeCategory;

    @BeforeEach
    public void setupEach(){
        var user = userRepository.findByEmail("test@test.test");

        testIncomeCategory = new IncomeCategory();
        testIncomeCategory.setUser(user);
        testIncomeCategory.setName("Test income category");
        testIncomeCategory.setColor("#111111");
        testIncomeCategory.setNote("Test income category note");

        testIncome = new Income();
        testIncome.setName("Test income");
        testIncome.setAmount(11111);
        testIncome.setCategory(testIncomeCategory);
        testIncome.setDate(new Date("10/12/2020"));
        testIncome.setUser(user);
        testIncome.setNote("Test income note");
    }

    @Test
    @WithMockUser("test@test.test")
    public void testNewIncomeData() throws Exception {
        var inc_cat = incomeCategoryRepository.save(testIncomeCategory);

        mvc.perform(post("/api/newIncome")
                .contentType(MediaType.APPLICATION_JSON)
                .param("name","Test income")
                .param("category_id", String.valueOf(inc_cat.getId()))
                .param("amount", "11111")
                .param("date", "2000-10-11")
                .param("note", "Test income note")
        ).andExpect(matchAll(
                status().isOk()
        ));

        mvc.perform(get("/api/getIncomes"))
                .andExpect(matchAll(
                        status().isOk(),
                        jsonPath("$.income", hasSize(1))
                ));
    }

    @Test
    @WithMockUser("test@test.test")
    public void testGetIncomeData() throws Exception {
        incomeCategoryRepository.save(testIncomeCategory);
        incomeRepository.save(testIncome);

        mvc.perform(get("/api/getIncomes"))
                .andExpect(matchAll(
                        status().isOk(),
                        jsonPath("$.income", hasSize(1))
                ));
    }

    @Test
    @WithMockUser("test@test.test")
    public void testUpdateIncomeData() throws Exception {
        var inc_cat = incomeCategoryRepository.save(testIncomeCategory);
        var inc = incomeRepository.save(testIncome);

        JSONArray name = new JSONArray();
        name.add("New test name");

        JSONArray note = new JSONArray();
        note.add("new updated note");

        mvc.perform(post("/api/updateIncome")
                .param("id",String.valueOf(inc.getId()))
                .param("name", "New test name")
                .param("category_id", String.valueOf(inc_cat.getId()))
                .param("amount", "22222")
                .param("date", "1999-02-04")
                .param("note", "new updated note"))
                .andExpect(matchAll(
                        status().isOk()
                ));

        mvc.perform(get("/api/getIncomes"))
                .andExpect(matchAll(
                        status().isOk(),
                        jsonPath("$.income[:1].name",is(name)),
                        jsonPath("$.income[:1].note",is(note))
                ));
    }

    @Test
    @WithMockUser("test@test.test")
    public void testDeleteIncomeData() throws Exception {
        var inc_cat = incomeCategoryRepository.save(testIncomeCategory);
        var inc = incomeRepository.save(testIncome);

        mvc.perform(post("/api/deleteIncome")
                .param("id",String.valueOf(inc.getId())))
                .andExpect(matchAll(
                        status().isOk()
                ));

        mvc.perform(get("/api/getIncomes"))
                .andExpect(matchAll(
                        status().isOk(),
                        jsonPath("$.income", hasSize(0))
                ));
    }

}
