package pl.edu.pw.bgtTracker.notifications;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    System.out.println("TOKEN: " + token);
    this.fcmClient.subscribe("test2", token);
    return;
  }

}