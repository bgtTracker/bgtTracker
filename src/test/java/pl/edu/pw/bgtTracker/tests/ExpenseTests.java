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
import pl.edu.pw.bgtTracker.db.entities.Expense;
import pl.edu.pw.bgtTracker.db.entities.ExpenseCategory;
import pl.edu.pw.bgtTracker.db.repos.ExpenseCategoryRepository;
import pl.edu.pw.bgtTracker.db.repos.ExpenseRepository;
import pl.edu.pw.bgtTracker.db.repos.UserRepository;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.ResultMatcher.matchAll;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Date;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
@ExtendWith(RegisterUserExtension.class)
@Transactional
public class ExpenseTests {
    @Autowired private MockMvc mvc;
    @Autowired private ExpenseRepository expenseRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private ExpenseCategoryRepository expenseCategoryRepository;

    private Expense testExpense;
    private ExpenseCategory testExpenseCategory;

    @BeforeEach
    public void setupEach(){
        var user = userRepository.findByEmail("test@test.test");

        testExpenseCategory = new ExpenseCategory();
        testExpenseCategory.setUser(user);
        testExpenseCategory.setName("Test expense category");
        testExpenseCategory.setColor("#111111");
        testExpenseCategory.setNote("Test expense category note");

        testExpense = new Expense();
        testExpense.setUser(user);
        testExpense.setName("Test expense");
        testExpense.setAmount(11111);
        testExpense.setCategory(testExpenseCategory);
        testExpense.setDate(new Date("10/12/2020"));
        testExpense.setNote("Test expense note");
    }

    @Test
    @WithMockUser("test@test.test")
    public void testNewExpenseData() throws Exception {
        var exp_cat = expenseCategoryRepository.save(testExpenseCategory);

        mvc.perform(post("/api/newExpense")
                .contentType(MediaType.APPLICATION_JSON)
                .param("name","Test expense")
                .param("category_id", String.valueOf(exp_cat.getId()))
                .param("amount", "11111")
                .param("date", "2000-10-11")
                .param("note", "Test expense category note")
        ).andExpect(matchAll(
                status().isOk()
        ));

    }

    @Test
    @WithMockUser("test@test.test")
    public void testGetExpenseData() throws Exception {
        expenseCategoryRepository.save(testExpenseCategory);
        expenseRepository.save(testExpense);

        mvc.perform(get("/api/getExpenses"))
                .andExpect(matchAll(
                        status().isOk(),
                        jsonPath("$.expense", hasSize(1))
                ));

    }
    @Test
    @WithMockUser("test@test.test")
    public void testUpdateExpenseData() throws Exception {
        var exp_cat = expenseCategoryRepository.save(testExpenseCategory);
        var exp = expenseRepository.save(testExpense);

        JSONArray name = new JSONArray();
        name.add("New test name");

        JSONArray note = new JSONArray();
        note.add("new updated note");

        mvc.perform(post("/api/updateExpense")
                .param("id",String.valueOf(exp.getId()))
                .param("name", "New test name")
                .param("category_id", String.valueOf(exp_cat.getId()))
                .param("amount", "22222")
                .param("date", "1999-02-04")
                .param("note", "new updated note"))
                .andExpect(matchAll(
                        status().isOk()
                ));

        mvc.perform(get("/api/getExpenses"))
                .andExpect(matchAll(
                        status().isOk(),
                        jsonPath("$.expense[:1].name",is(name)),
                        jsonPath("$.expense[:1].note",is(note))
                ));
    }

    @Test
    @WithMockUser("test@test.test")
    public void testDeleteExpenseData() throws Exception {
        var exp_cat = expenseCategoryRepository.save(testExpenseCategory);
        var exp = expenseRepository.save(testExpense);

        mvc.perform(post("/api/deleteExpense")
                .param("id",String.valueOf(exp.getId())))
                .andExpect(matchAll(
                        status().isOk()
                ));

        mvc.perform(get("/api/getExpenses"))
                .andExpect(matchAll(
                        status().isOk(),
                        jsonPath("$.expense", hasSize(0))
                ));
    }

}
