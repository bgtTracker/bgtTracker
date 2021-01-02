package pl.edu.pw.bgtTracker.notifications;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import net.minidev.json.JSONObject;
import pl.edu.pw.bgtTracker.BgtTrackerApplication;
import pl.edu.pw.bgtTracker.db.UserRepository;
import pl.edu.pw.bgtTracker.db.entities.User;
import pl.edu.pw.bgtTracker.notifications.FcmClient;


@RestController
@CrossOrigin
public class NotificationsController {

  private final FcmClient fcmClient;
  private final NotificationsService notificationsService;


  public NotificationsController(FcmClient fcmClient, NotificationsService notificationsService) {
    this.fcmClient = fcmClient;
    this.notificationsService = notificationsService;
  }

  @PostMapping("/api/pushsubscribe")
  public void register(@RequestParam(value = "token") String token,
    @RequestParam(value = "topic") String topic) 
  {
    BgtTrackerApplication.logger.info("Register topic: " + topic);
    this.fcmClient.subscribe(topic, token);
    return;
  }

  @GetMapping( value={"/api/getNotifications"}, produces=MediaType.APPLICATION_JSON_VALUE)
  public JSONObject getNotifications(@RequestParam(value = "user") String user)
  {
    BgtTrackerApplication.logger.info("Notifications requested for " + user);
    return notificationsService.getNotification(Long.parseLong(user));
  }

  @PostMapping("/api/notificationsread")
  public void alertRead(@RequestParam(value="id") String id)
  {
    notificationsService.readNotifications(Integer.parseInt(id));
    BgtTrackerApplication.logger.info("Notifications has been reed " + id);
    //to do handle response correntyl
    return;
  }
}