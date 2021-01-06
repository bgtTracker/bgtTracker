package pl.edu.pw.bgtTracker.api.notifications;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import pl.edu.pw.bgtTracker.BgtTrackerApplication;
import pl.edu.pw.bgtTracker.db.repos.AlertRepository;
import pl.edu.pw.bgtTracker.db.repos.UserRepository;
import pl.edu.pw.bgtTracker.db.entities.Alert;
import pl.edu.pw.bgtTracker.db.entities.AppUser;

@Service
public class NotificationsService {
    private final FcmClient fcmClient;

    private final Integer seq = 0;

    @Autowired
    private AlertRepository alertRepository;
    @Autowired
    private UserRepository userRepository;

    public NotificationsService(FcmClient fcmClient)
    {
        this.fcmClient = fcmClient;

    }

    // @Scheduled(fixedDelay = 7000, initialDelay = 4000)
    // public void sendTestMsg() throws InterruptedException, ExecutionException 
    // {
    //     BgtTrackerApplication.logger.info("Sending test msg");
    //     sendWaring(1, "KOCHAM PW ja dupia" + seq, "warning");
    //     // sendNotifiaction("1", "KOCHAM PW ja dupia2", "info", "info");
    //     // sendNotifiaction("1", "KOCHAM PW ja dupia2", "success", "success");
    //     // sendNotifiaction("1", "KOCHAM PW ja dupia2", "error", "error");
    //     seq++;
    // }

    private void sendNotifiaction(long id, String topic, String msg, String level, String title) throws InterruptedException, ExecutionException 
    {
        Map<String, String> notification = new HashMap<>();
        notification.put("id", Long.toString(id));
        notification.put("msg", msg);
        notification.put("title", title);
        notification.put("level", level);
        notification.put("action", "showNotification");
        BgtTrackerApplication.logger.info("Sending push notification...");
        this.fcmClient.send(notification, topic);
    }

    private Alert putAlert(long userid, String msg, String level, String title)
    {
        Alert newAlert = new Alert();
        AppUser u = userRepository.findById(userid).get();
        newAlert.setTitle(title);
        newAlert.setContent(msg);
        newAlert.setLevel(level);
        newAlert.setUser(u);
        alertRepository.save(newAlert);
        return newAlert;
    }

    public void sendWaring(long userID, String msg, String title) throws InterruptedException, ExecutionException 
    {
        long id = this.putAlert(userID, msg, "warning", title).getId();
        this.sendNotifiaction(id, Long.toString(userID) , msg, "warning", title);
    }

    public void sendInfo(long userID, String msg, String title) throws InterruptedException, ExecutionException 
    {
        long id = this.putAlert(userID, msg, "warning", title).getId();
        this.sendNotifiaction(id, Long.toString(userID) , msg, "info", title);
    }

    public void sendSuccess(long userID, String msg, String title) throws InterruptedException, ExecutionException 
    {
        long id = this.putAlert(userID, msg, "warning", title).getId();
        this.sendNotifiaction(id, Long.toString(userID) , msg, "success", title);
    }

    public void sendError(long userID, String msg, String title) throws InterruptedException, ExecutionException 
    {
        long id = this.putAlert(userID, msg, "warning", title).getId();
        this.sendNotifiaction(id, Long.toString(userID) , msg, "error", title);
    }

    // public void sendNotifiactionTopic(String topic, String msg, String level, String title) throws InterruptedException, ExecutionException 
    // {
    //     // long id = this.putAlert(userID, msg, "warning", title).getId();
    //     this.sendNotifiaction(topic, msg, level, title);
    // }

    public JSONObject getNotification(long userID)
    {
        AppUser user = userRepository.findById(userID).get();
        List<Alert> alerts = alertRepository.findByUser(user);

        JSONObject newD = new JSONObject();

        JSONArray arr = new JSONArray();

        for(var a: alerts)
        {
            if(!a.isRead())
            {
                JSONObject n = a.toJSON();
                n.put("action", "showNotification");
                arr.add(n);
            }
        }
        
        newD.put("notifications", arr);
        return newD;
    }

    public Boolean readNotifications(long id)
    {
        try{
            //to do place actual code
            Alert alert = alertRepository.findById(id).get();
            alert.setRead(true);
            alertRepository.save(alert);
            return true;
        }catch(Exception e) //to do change that mayby
        {
            BgtTrackerApplication.logger.error(e.toString());
            return false;
        }
    }

}
