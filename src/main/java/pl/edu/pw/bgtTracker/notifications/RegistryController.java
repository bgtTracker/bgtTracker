package pl.edu.pw.bgtTracker.notifications;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import pl.edu.pw.bgtTracker.BgtTrackerApplication;
import pl.edu.pw.bgtTracker.notifications.FcmClient;


@RestController
@CrossOrigin
public class RegistryController {

  private final FcmClient fcmClient;

  public RegistryController(FcmClient fcmClient) {
    this.fcmClient = fcmClient;
  }

  @PostMapping("/api/pushsubscribe")
  public void register(@RequestParam(value = "token") String token,
    @RequestParam(value = "topic") String topic) 
  {
    BgtTrackerApplication.logger.info("Register topic: " + topic);
    this.fcmClient.subscribe(topic, token);
    return;
  }

}