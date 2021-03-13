package pl.edu.pw.bgtTracker.tests;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import pl.edu.pw.bgtTracker.db.entities.AppUser;
import pl.edu.pw.bgtTracker.db.repos.UserRepository;

import static org.springframework.test.web.servlet.ResultMatcher.matchAll;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
@ExtendWith(RegisterUserExtension.class)
@Transactional
public class UserTests {
    @Autowired private MockMvc mvc;
    @Autowired private UserRepository users;
    @Autowired private BCryptPasswordEncoder encoder;

    @BeforeEach
    public void setupEach() {
        var testUser = new AppUser();

        testUser.setEmail("another.test@test.test");
        testUser.setPassword(encoder.encode("test123"));
        testUser.setFirstName("Another");
        testUser.setLastName("Test");

        users.save(testUser);
    }

    @Test
    @WithMockUser("another.test@test.test")
    public void testFirstName() throws Exception {
        mvc.perform(post("/api/user/first-name")
                .contentType(MediaType.APPLICATION_JSON)
                .content("TestFirstName")
        ).andExpect(status().isOk());

        mvc.perform(get("/api/user/first-name"))
                .andExpect(matchAll(
                        status().isOk(),
                        content().string("TestFirstName")
                ));
    }

    @Test
    @WithMockUser("another.test@test.test")
    public void testLastName() throws Exception {
        mvc.perform(post("/api/user/last-name")
                .contentType(MediaType.APPLICATION_JSON)
                .content("TestLastName")
        ).andExpect(status().isOk());

        mvc.perform(get("/api/user/last-name"))
                .andExpect(matchAll(
                        status().isOk(),
                        content().string("TestLastName")
                ));
    }

    @Test
    @WithMockUser("another.test@test.test")
    public void testPassword() throws Exception {
        mvc.perform(post("/api/user/password")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"oldPassword\": \"test123\", \"newPassword\": \"admin123\"}")
        ).andExpect(matchAll(
                status().isOk(),
                content().string("true")
        ));

        var user = users.findByEmail("another.test@test.test");
        Assertions.assertTrue(encoder.matches("admin123", user.getPassword()));
    }
}
