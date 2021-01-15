package pl.edu.pw.bgtTracker.api;

import net.minidev.json.parser.ParseException;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import pl.edu.pw.bgtTracker.db.entities.AppUser;
import pl.edu.pw.bgtTracker.db.entities.Comment;
import pl.edu.pw.bgtTracker.db.repos.CommentsRepository;
import pl.edu.pw.bgtTracker.db.repos.UserRepository;

@RestController
@RequestMapping(value={"/api/comments"})
public class CommentsContoller {
    @Autowired private UserRepository userRepository;
    @Autowired private CommentsRepository commentsRepository;

    @GetMapping("/getAll")
    private JSONObject getALL(Authentication auth)
    {
      AppUser user = userRepository.findByEmail(auth.getName());
      JSONObject data = new JSONObject();
      JSONArray jsonComments = new JSONArray();
      List<Comment> comments = user.getComments();
      for(var c : comments)
      {
        jsonComments.add(c.toJSON());
      }
      data.put("data", jsonComments);
      return data;
    }

    @PostMapping("/new")
    private long newComment(Authentication auth, @RequestBody String newCommentbody, HttpServletResponse httpServletResponse)
    {
      AppUser user = userRepository.findByEmail(auth.getName());
      JSONObject newCommentParsed = paresStringToJson(newCommentbody, httpServletResponse);

      return saveEnttiy(user, newCommentParsed);
    }

    @PutMapping("/edit")
    private void editComment(Authentication auth, @RequestBody String newCommentbody, HttpServletResponse httpServletResponse)
    {
      AppUser user = userRepository.findByEmail(auth.getName());
      JSONObject newCommentParsed = paresStringToJson(newCommentbody, httpServletResponse);
      editEntiy(user, newCommentParsed);
    }

    @DeleteMapping("/delete")
    private void deleteComment(Authentication auth, @RequestBody String commentID)
    {
      AppUser user = userRepository.findByEmail(auth.getName());
      commentsRepository.deleteById(Long.parseLong(commentID));
    }

    private long saveEnttiy(AppUser user, JSONObject newCommentParsed )
    {
      Comment newComment = new Comment();
      newComment.setContent((String) newCommentParsed.get("content"));
      newComment.setTitle((String) newCommentParsed.get("title"));
      newComment.setDate(new Date((long) newCommentParsed.get("date")));
      newComment.setUser(user);
      commentsRepository.save(newComment);
      return newComment.getId();
    }

    private void editEntiy(AppUser user, JSONObject newCommentParsed)
    {
      Comment comment = commentsRepository.findById((Long) newCommentParsed.get("id")).get();
      comment.setContent((String) newCommentParsed.get("content"));
      comment.setTitle((String) newCommentParsed.get("title"));
      commentsRepository.save(comment);
    }


    private JSONObject paresStringToJson(String bodyString, HttpServletResponse httpServletResponse) {
      JSONParser parser = new JSONParser(JSONParser.MODE_JSON_SIMPLE);
      JSONObject body;
      try {

          body = (JSONObject) parser.parse(bodyString);

      } catch (ParseException pe) {
          body = new JSONObject();
          body.put("error", "bad parsing-bad data to parse");
          httpServletResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);  
      } catch (Exception e) {
          body = new JSONObject();
          body.put("error", "unknwonn error");
          httpServletResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST); //?? good code?
      }

      return body;
  }
}
