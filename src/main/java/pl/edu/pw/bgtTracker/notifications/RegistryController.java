package pl.edu.pw.bgtTracker.notifications;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

  @PostMapping("/register")
  public void register(@RequestBody String token) {
    System.out.println("TOKEN: " + token);
    this.fcmClient.subscribe("test", token);
    return;
  }

}