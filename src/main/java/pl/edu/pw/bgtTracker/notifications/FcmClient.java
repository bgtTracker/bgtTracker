package pl.edu.pw.bgtTracker.notifications;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.TopicManagementResponse;
import com.google.firebase.messaging.WebpushConfig;
import com.google.firebase.messaging.WebpushNotification;

import pl.edu.pw.bgtTracker.notifications.FcmSettings;
import pl.edu.pw.bgtTracker.BgtTrackerApplication;

@Service
public class FcmClient {

  public FcmClient(FcmSettings settings) {
    Path p = Paths.get(settings.getServiceAccountFile());
    try (InputStream serviceAccount = Files.newInputStream(p)) {
      FirebaseOptions options = new FirebaseOptions.Builder()
          .setCredentials(GoogleCredentials.fromStream(serviceAccount)).build();

      FirebaseApp.initializeApp(options);
    }
    catch (IOException e) {
        BgtTrackerApplication.logger.error("init fcm", e);
    }
  }

  public void send(Map<String, String> data, String topic)
      throws InterruptedException, ExecutionException {

    Message message = Message.builder().putAllData(data).setTopic(topic)
        .setWebpushConfig(WebpushConfig.builder().putHeader("ttl", "300")
            .setNotification(new WebpushNotification("Bgt tracker",
                data.get("msg"), "logo192.png"))
            .build())
        .build();

    String response = FirebaseMessaging.getInstance().sendAsync(message).get();
    BgtTrackerApplication.logger.info("Sent message: " + response);
  }

  public void subscribe(String topic, String clientToken) {
    try {
      TopicManagementResponse response = FirebaseMessaging.getInstance()
          .subscribeToTopicAsync(Collections.singletonList(clientToken), topic).get();
      System.out
          .println(response.getSuccessCount() + " tokens were subscribed successfully");
    }
    catch (InterruptedException | ExecutionException e) {
        BgtTrackerApplication.logger.error("subscribe", e);
    }
  }
}