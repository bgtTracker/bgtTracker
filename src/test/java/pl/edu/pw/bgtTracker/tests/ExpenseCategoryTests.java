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
import pl.edu.pw.bgtTracker.db.entities.ExpenseCategory;
import pl.edu.pw.bgtTracker.db.entities.IncomeCategory;
import pl.edu.pw.bgtTracker.db.repos.ExpenseCategoryRepository;
import pl.edu.pw.bgtTracker.db.repos.UserRepository;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
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
public class ExpenseCategoryTests {
    @Autowired private MockMvc mvc;
    @Autowired private ExpenseCategoryRepository expenseCategoryRepository;
    @Autowired private UserRepository userRepository;

    private ExpenseCategory testExpenseCategory;

    @BeforeEach
    public void setupEach(){
        var user = userRepository.findByEmail("test@test.test");

        testExpenseCategory = new ExpenseCategory();
        testExpenseCategory.setUser(user);
        testExpenseCategory.setName("Test expense category");
        testExpenseCategory.setColor("#111111");
        testExpenseCategory.setNote("Test expense category note");
    }

    @Test
    @WithMockUser("test@test.test")
    public void testGetExpenseCategory() throws Exception {
        expenseCategoryRepository.save(testExpenseCategory);

        mvc.perform(get("/api/getExpenseCategory"))
                .andExpect(matchAll(
                        status().isOk(),
                        jsonPath("$.category", hasSize(1))
                ));
    }

    @Test
    @WithMockUser("test@test.test")
    public void testNewExpenseCategoryData () throws Exception {
        //var exp = expenseCategoryRepository.save(testExpenseCategory);
        mvc.perform(post("/api/newExpenseCategory")
                .contentType(MediaType.APPLICATION_JSON)
                .param("name","Test expense category")
                .param("color", "#111111")
                .param("note", "Test expense category note")
        ).andExpect(matchAll(
                status().isOk()
        ));

        mvc.perform(get("/api/getExpenseCategory"))
                .andExpect(matchAll(
                        status().isOk(),
                        jsonPath("$.category", hasSize(1))
                ));
    }

    @Test
    @WithMockUser("test@test.test")
    public void testUpdateExpenseCategoryData() throws Exception {
        var exp = expenseCategoryRepository.save(testExpenseCategory);

        JSONArray name = new JSONArray();
        name.add("New test name");
        JSONArray color = new JSONArray();
        color.add("#000000");
        JSONArray note = new JSONArray();
        note.add("new updated note");

        mvc.perform(post("/api/updateExpenseCategory")
                .param("id", String.valueOf(exp.getId()))
                .param("name", "New test name")
                .param("color", "#000000")
                .param("note", "new updated note"))
                .andExpect(matchAll(
                        status().isOk()
                ));
        mvc.perform(get("/api/getExpenseCategory"))
                .andExpect(matchAll(
                        status().isOk(),
                        jsonPath("$.category[:1].name", is(name)),
                        jsonPath("$.category[:1].color", is(color)),
                        jsonPath("$.category[:1].note", is(note))
                ));
    }

    @Test
    @WithMockUser("test@test.test")
    public void testDeleteExpenseCategory() throws Exception {
        var exp = expenseCategoryRepository.save(testExpenseCategory);

        mvc.perform(post("/api/deleteExpenseCategory")
                .param("id",String.valueOf(exp.getId())))
                .andExpect(matchAll(
                        status().isOk()
                ));

        mvc.perform(get("/api/getExpenseCategory"))
                .andExpect(matchAll(
                        status().isOk(),
                        jsonPath("$.category", hasSize(0))
                ));
    }

}
