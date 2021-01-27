package pl.edu.pw.bgtTracker.tests;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import pl.edu.pw.bgtTracker.db.entities.AppUser;
import pl.edu.pw.bgtTracker.db.repos.UserRepository;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
@ExtendWith(RegisterUserExtension.class)
@Transactional
public class AuthTests {
    private static final ObjectMapper mapper = new ObjectMapper();
    @Autowired private MockMvc mvc;
    @Autowired private UserRepository users;
    @Autowired BCryptPasswordEncoder encoder;

    @Test
    public void testRegister() throws Exception {
        var user = new AppUser();
        user.setFirstName("FirstName");
        user.setLastName("LastName");
        user.setEmail("another.test@test.test");
        user.setPassword("test123");

        mvc.perform(post("/api/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(user))
        ).andExpect(status().isOk());

        var testUser = users.findByEmail("another.test@test.test");

        Assertions.assertNotEquals(null, testUser);
        Assertions.assertNotEquals(0, testUser.getId());
        Assertions.assertEquals("FirstName", testUser.getFirstName());
        Assertions.assertEquals("LastName", testUser.getLastName());
        Assertions.assertTrue(encoder.matches(user.getPassword(), testUser.getPassword()));
    }
}
