package pl.edu.pw.bgtTracker.tests;

import com.fasterxml.jackson.databind.ObjectMapper;
import net.minidev.json.JSONArray;
import net.minidev.json.parser.JSONParser;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import pl.edu.pw.bgtTracker.api.tables.IncomeCategoriesService;
import pl.edu.pw.bgtTracker.db.entities.IncomeCategory;
import pl.edu.pw.bgtTracker.db.repos.IncomeCategoryRepository;
import pl.edu.pw.bgtTracker.db.repos.UserRepository;
import org.springframework.http.MediaType;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.ResultMatcher.*;
import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
@ExtendWith(RegisterUserExtension.class)
@Transactional
public class IncomeCategoryTests {
    //private static final ObjectMapper mapper = new ObjectMapper();
    @Autowired private MockMvc mvc;
    @Autowired private IncomeCategoryRepository incomeCategoryRepository;
    @Autowired private IncomeCategoriesService incomeCategoriesService;
    @Autowired private UserRepository userRepository;

    private IncomeCategory testIncomeCategory;

    @BeforeEach
    public void setupEach(){
        var user = userRepository.findByEmail("test@test.test");

        testIncomeCategory = new IncomeCategory();
        testIncomeCategory.setUser(user);
        testIncomeCategory.setName("Test income category");
        testIncomeCategory.setColor("#111111");
        testIncomeCategory.setNote("Test income category note");

    }

    @Test
    @WithMockUser("test@test.test")
    public void testNewIncomeCategoryData() throws Exception {
        mvc.perform(post("/api/newIncomeCategory")
                .contentType(MediaType.APPLICATION_JSON)
                .param("name","Test income category")
                .param("color", "#111111")
                .param("note", "Test income category note")
        ).andExpect(matchAll(
                status().isOk()
        ));

        mvc.perform(get("/api/getIncomeCategory"))
                .andExpect(matchAll(
                        status().isOk(),
                        jsonPath("$.category", hasSize(1))
                ));
    }

    @Test
    @WithMockUser("test@test.test")
    public void testGetIncomeCategory() throws Exception {
        incomeCategoryRepository.save(testIncomeCategory);

        mvc.perform(get("/api/getIncomeCategory"))
                .andExpect(matchAll(
                        status().isOk(),
                        jsonPath("$.category", hasSize(1))
                        //status().isBadRequest()
                ));
    }

    @Test
    @WithMockUser("test@test.test")
    public void testUpdateIncomeCategoryData() throws Exception {
        var inc = incomeCategoryRepository.save(testIncomeCategory);
        var id = String.valueOf(inc.getId());

        JSONArray name = new JSONArray();
        name.add("New test name");
        JSONArray color = new JSONArray();
        color.add("#000000");
        JSONArray note = new JSONArray();
        note.add("new updated note");
        mvc.perform(post("/api/updateIncomeCategory")
                .param("id", id)
                .param("name", "New test name")
                .param("color", "#000000")
                .param("note", "new updated note"))
                .andExpect(matchAll(
                        status().isOk()
                ));

        mvc.perform(get("/api/getIncomeCategory"))
                .andExpect(matchAll(
                        status().isOk(),
                        //status().isBadRequest(),
                        jsonPath("$.category[:1].name", is(name)),
                        jsonPath("$.category[:1].color", is(color)),
                        jsonPath("$.category[:1].note", is(note))
                ));

    }

    @Test
    @WithMockUser("test@test.test")
    public void testDeleteIncomeCategory() throws Exception{
        var inc = incomeCategoryRepository.save(testIncomeCategory);

        mvc.perform(post("/api/deleteIncomeCategory")
                .param("id",String.valueOf(inc.getId())))
                .andExpect(matchAll(
                        status().isOk()
                ));

        mvc.perform(get("/api/getIncomeCategory"))
                .andExpect(matchAll(
                        status().isOk(),
                        //status().isBadRequest(),
                        jsonPath("$.category", hasSize(0))
                ));
    }

    @Test
    void shouldShowSimpleAssertion() {
        Assertions.assertEquals(1,1);
    }
}
