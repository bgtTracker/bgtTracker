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

import net.minidev.json.JSONObject;
import pl.edu.pw.bgtTracker.db.entities.Bank;
import pl.edu.pw.bgtTracker.db.entities.Comment;
import pl.edu.pw.bgtTracker.db.repos.BankRepository;
import pl.edu.pw.bgtTracker.db.repos.CommentsRepository;
import pl.edu.pw.bgtTracker.db.repos.UserRepository;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.ResultMatcher.matchAll;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Date;

@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
@ExtendWith(RegisterUserExtension.class)
@Transactional
public class CommentsTest {;
  @Autowired private MockMvc mvc;
  @Autowired private CommentsRepository commentsRepository;
  @Autowired private UserRepository users;
  private Comment comment;

  @BeforeEach
  public void setupEach() {
      var user = users.findByEmail("test@test.test");

      comment = new Comment();
      comment.setTitle("test");
      comment.setDate(new Date());
      comment.setUser(user);
      comment.setContent("content");
  }

  @Test
  @WithMockUser("test@test.test")
  public void testAdd() throws Exception{
    JSONObject commentJson = comment.toJSON();
    commentJson.replace("date", comment.getDate().getTime());
    mvc.perform(post("/api/comments/new")
      .contentType(MediaType.APPLICATION_JSON)
      .content(commentJson.toString())
    ) .andExpect(status().isOk());
  }

  @Test
  @WithMockUser("test@test.test")
  public void testGet() throws Exception{
    commentsRepository.saveAndFlush(comment);
    mvc.perform(get("/api/comments/getAll")
      .contentType(MediaType.APPLICATION_JSON)
    ).andExpect(matchAll(
      status().isOk(),
      jsonPath("@.data", hasSize(1)),
      jsonPath("@.data[0].title", is(comment.getTitle()))
    ));
  }

  @Test
  @WithMockUser("test@test.test")
  public void testEdit() throws Exception{
    commentsRepository.saveAndFlush(comment);
    JSONObject commentJson = comment.toJSON();
    commentJson.replace("date", comment.getDate().getTime());
    commentJson.replace("title", "edit");
    mvc.perform(put("/api/comments/edit")
    .contentType(MediaType.APPLICATION_JSON)
    .content(commentJson.toString())
  ).andExpect(matchAll(
    status().isOk()));

    mvc.perform(get("/api/comments/getAll")
      .contentType(MediaType.APPLICATION_JSON)
      .content(commentJson.toString())
    ).andExpect(matchAll(
      status().isOk(),
      jsonPath("@.data", hasSize(1)),
      jsonPath("@.data[0].title", is("edit"))
    ));
  }

  @Test
  @WithMockUser("test@test.test")
  public void testDelete() throws Exception{
    Long id = commentsRepository.saveAndFlush(comment).getId();
    mvc.perform(delete("/api/comments/delete")
      .contentType(MediaType.APPLICATION_JSON)
      .content(id.toString())
    ).andExpect(matchAll(
      status().isOk()
    ));

    assert(commentsRepository.findById(id).isPresent() == false);
  }
}
