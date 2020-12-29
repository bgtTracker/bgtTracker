package pl.edu.pw.bgtTracker.notifications;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import pl.edu.pw.bgtTracker.BgtTrackerApplication;

@Service
public class NotificationsService {
    private final FcmClient fcmClient;

    private Integer seq = 0;

    public NotificationsService(FcmClient fcmClient)
    {
        this.fcmClient = fcmClient;
    }

    @Scheduled(fixedDelay = 2000, initialDelay = 2000)
    public void sendTestMsg() throws InterruptedException, ExecutionException 
    {
        BgtTrackerApplication.logger.info("Sending test msg");
        sendNotifiaction("1", "KOCHAM PW ja dupia2", "warning", "warning");
        sendNotifiaction("1", "KOCHAM PW ja dupia2", "info", "info");
        sendNotifiaction("1", "KOCHAM PW ja dupia2", "success", "success");
        sendNotifiaction("1", "KOCHAM PW ja dupia2", "error", "error");
    }

    public void sendNotifiaction(String topic, String msg, String level, String title) throws InterruptedException, ExecutionException 
    {
        Map<String, String> data = new HashMap<>();
        data.put("id", seq.toString());
        data.put("msg", msg);
        data.put("title", title);
        data.put("level", level);
        data.put("action", "showNotification");
        seq++;
        BgtTrackerApplication.logger.info("Sending push notification...");
        this.fcmClient.send(data, topic);
    }

    public void sendWaring(int userID, String msg, String title) throws InterruptedException, ExecutionException 
    {
        this.sendNotifiaction(Integer.toString(userID) , msg, "warning", title);
    }

    public void sendInfo(int userID, String msg, String title) throws InterruptedException, ExecutionException 
    {
        this.sendNotifiaction(Integer.toString(userID) , msg, "info", title);
    }

    public void sendSuccess(int userID, String msg, String title) throws InterruptedException, ExecutionException 
    {
        this.sendNotifiaction(Integer.toString(userID) , msg, "success", title);
    }

    public void sendError(int userID, String msg, String title) throws InterruptedException, ExecutionException 
    {
        this.sendNotifiaction(Integer.toString(userID) , msg, "error", title);
    }

}
