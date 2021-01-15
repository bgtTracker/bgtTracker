package pl.edu.pw.bgtTracker.api;

import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import pl.edu.pw.bgtTracker.api.notifications.NotificationsService;
import pl.edu.pw.bgtTracker.db.entities.AppUser;
import pl.edu.pw.bgtTracker.db.entities.ExpenseCategory;
import pl.edu.pw.bgtTracker.db.repos.TestExpenseCategoryRepository;
import pl.edu.pw.bgtTracker.db.repos.UserRepository;

@RestController
public class TestController {
    @Autowired private UserRepository userRepository;
    @Autowired private NotificationsService notificationsService;

    @GetMapping("/api/notitest")
    public void testNoti(Authentication auth) throws InterruptedException, ExecutionException 
    {
        AppUser user = userRepository.findByEmail(auth.getName());
        notificationsService.sendTestMsg(user.getId());
    }
}
