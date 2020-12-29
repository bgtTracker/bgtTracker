package pl.edu.pw.bgtTracker.notifications;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import pl.edu.pw.bgtTracker.BgtTrackerApplication;

@Service
public class PushService {
    private final FcmClient fcmClient;

    private Integer seq = 0;

    public PushService(FcmClient fcmClient)
    {
        this.fcmClient = fcmClient;
    }

    @Scheduled(fixedDelay = 1000, initialDelay = 400)
    public void sendTestMsg() throws InterruptedException, ExecutionException 
    {
        BgtTrackerApplication.logger.info("Sending test msg");
        sendPushMessage("KOCHAM PW ja dupia2", "warning", "be carefull");
    }

    public void sendPushMessage(String msg, String level, String title) throws InterruptedException, ExecutionException 
    {
        Map<String, String> data = new HashMap<>();
        data.put("id", seq.toString());
        data.put("msg", msg);
        data.put("title", title);
        data.put("level", level);
        seq++;
        BgtTrackerApplication.logger.info("Sending push notification...");
        this.fcmClient.send(data, "test2");
      }
}
