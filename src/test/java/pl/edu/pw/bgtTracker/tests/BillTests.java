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
import pl.edu.pw.bgtTracker.db.entities.Bill;
import pl.edu.pw.bgtTracker.db.entities.ExpenseCategory;
import pl.edu.pw.bgtTracker.db.repos.BillRepository;
import pl.edu.pw.bgtTracker.db.repos.ExpenseCategoryRepository;
import pl.edu.pw.bgtTracker.db.repos.ExpenseRepository;
import pl.edu.pw.bgtTracker.db.repos.UserRepository;

import java.util.Date;

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
public class BillTests {
    @Autowired private MockMvc mvc;
    @Autowired private BillRepository billRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private ExpenseCategoryRepository expenseCategoryRepository;
    @Autowired private ExpenseRepository expenseRepository;

    private Bill testBill;
    private ExpenseCategory testExpenseCategory;

    @BeforeEach
    public void setupEach(){
        var user = userRepository.findByEmail("test@test.test");

        testExpenseCategory = new ExpenseCategory();
        testExpenseCategory.setUser(user);
        testExpenseCategory.setName("Test expense category");
        testExpenseCategory.setColor("#111111");
        testExpenseCategory.setNote("Test expense category note");

        testBill = new Bill();
        testBill.setName("Test bill");
        testBill.setAmount(12345);
        testBill.setCategory(testExpenseCategory);
        testBill.setDueDate(new Date("10/12/2020"));
        testBill.setNote("Test bill note");
        testBill.setBankNumber("88144011307166087613096369");
        testBill.setUser(user);
    }
    @Test
    @WithMockUser("test@test.test")
    public void testNewBillData() throws Exception {
        var exp_cat =  expenseCategoryRepository.save(testExpenseCategory);

        mvc.perform(post("/api/newBill")
                .contentType(MediaType.APPLICATION_JSON)
                .param("name","Test bill")
                .param("category_id", String.valueOf(exp_cat.getId()))
                .param("amount", "12345")
                .param("dueDate", "2000-10-11")
                .param("note", "Test income note")
                .param("bankNumber","88144011307166087613096369")
        ).andExpect(matchAll(
                status().isOk()
        ));

        mvc.perform(get("/api/getBills"))
                .andExpect(matchAll(
                        status().isOk(),
                        jsonPath("$.bill", hasSize(1))
                ));
    }

    @Test
    @WithMockUser("test@test.test")
    public void testGetBillData() throws Exception {
        expenseCategoryRepository.save(testExpenseCategory);
        billRepository.save(testBill);

        mvc.perform(get("/api/getBills"))
                .andExpect(matchAll(
                        status().isOk(),
                        jsonPath("$.bill", hasSize(1))
                ));
    }

    @Test
    @WithMockUser("test@test.test")
    public void testUpdateBillData() throws Exception {
        var exp_cat = expenseCategoryRepository.save(testExpenseCategory);
        var bil = billRepository.save(testBill);

        JSONArray name = new JSONArray();
        name.add("New test name");

        JSONArray note = new JSONArray();
        note.add("new updated note");

        mvc.perform(post("/api/updateBill")
                .param("id",String.valueOf(bil.getId()))
                .param("name", "New test name")
                .param("category_id", String.valueOf(exp_cat.getId()))
                .param("amount", "22222")
                .param("dueDate", "1999-02-04")
                .param("note", "new updated note")
                .param("bankNumber", "11111111111111111111111111"))
                .andExpect(matchAll(
                        status().isOk()
                ));

        mvc.perform(get("/api/getBills"))
                .andExpect(matchAll(
                        status().isOk(),
                        jsonPath("$.bill[:1].name",is(name)),
                        jsonPath("$.bill[:1].note",is(note))
                ));
    }

    @Test
    @WithMockUser("test@test.test")
    public void testDeleteBillData() throws Exception {
        var exp_cat = expenseCategoryRepository.save(testExpenseCategory);
        var bil = billRepository.save(testBill);

        mvc.perform(post("/api/deleteBill")
                .param("id",String.valueOf(bil.getId())))
                .andExpect(matchAll(
                        status().isOk()
                ));

        mvc.perform(get("/api/getBills"))
                .andExpect(matchAll(
                        status().isOk(),
                        jsonPath("$.bill", hasSize(0))
                ));
    }

    @Test
    @WithMockUser("test@test.test")
    public void testPayBill() throws Exception {
        var exp_cat = expenseCategoryRepository.save(testExpenseCategory);
        var bil = billRepository.save(testBill);
        JSONArray paymentDay = new JSONArray();
        paymentDay.add("11.10.2020");

        JSONArray isPaid = new JSONArray();
        isPaid.add(true);
        mvc.perform(post("/api/payBill")
                .param("id",String.valueOf(bil.getId()))
                .param("date", "2020-10-11"))
                .andExpect(matchAll(
                        status().isOk()
                ));

        mvc.perform(get("/api/getBills"))
                .andExpect(matchAll(
                        status().isOk(),
                        jsonPath("$.bill[:1].paymentDay",is(paymentDay)),
                        jsonPath("$.bill[:1].isPaid",is(isPaid))
                ));
    }


}
