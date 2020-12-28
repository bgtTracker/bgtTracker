package pl.edu.pw.bgtTracker.notifications;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class TestService {
    private final FcmClient fcmClient;

    private Integer seq = 0;

    public TestService(FcmClient fcmClient)
    {
        System.out.println("Test Srvice");
        this.fcmClient = fcmClient;
    }

    @Scheduled(fixedDelay = 1000, initialDelay = 400)
    public void sendTestMsg() throws InterruptedException, ExecutionException 
    {
        System.out.println("Sending test msg");
        sendPushMessage("KOCHAM PW ja dupia");
    }

    public void sendPushMessage(String msg) throws InterruptedException, ExecutionException 
    {
        Map<String, String> data = new HashMap<>();
        data.put("id", seq.toString());
        data.put("msg", msg);
        
        seq++;

        System.out.println("Sending push notification...");
        this.fcmClient.send(data, "test");
      }
}
