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

    public NotificationsService(FcmClient fcmClient) {
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

    /**
     * Send notificatos through push service to a topic(either user topic or general topic)
     * @param id - id of notification to send
     * @param topic - topic either is a user id (user topic) or gereral topic
     * @param msg - main content of the notification
     * @param level - (waring, succes, info, error) which color/notificatin will show up in front end
     * @param title 
     * @throws InterruptedException
     * @throws ExecutionException
     */
    private void sendNotifiaction(long id, String topic, String msg, String level, String title) throws InterruptedException, ExecutionException {
        Map<String, String> notification = new HashMap<>();
        notification.put("id", Long.toString(id));
        notification.put("msg", msg);
        notification.put("title", title);
        notification.put("level", level);
        notification.put("action", "showNotification");
        BgtTrackerApplication.logger.info("Sending push notification...");
        this.fcmClient.send(notification, topic);
    }

    /**
     *  Saves alert to data base 
     * @param userid 
     * @param msg - content od the alert
     * @param level - (waring succes info error) level used to show corrent alet in front end
     * @param title - title of the alert
     * @return
     */
    private Alert putAlert(long userid, String msg, String level, String title) {
        Alert newAlert = new Alert();
        AppUser u = userRepository.findById(userid).get();
        newAlert.setTitle(title);
        newAlert.setContent(msg);
        newAlert.setLevel(level);
        newAlert.setUser(u);
        alertRepository.save(newAlert);
        return newAlert;
    }

    /**
     * Sends waring to a user and put this alert in data base
     * @param userID
     * @param msg - content od the alert
     * @param title
     * @throws InterruptedException
     * @throws ExecutionException
     */
    public void sendWaring(long userID, String msg, String title) throws InterruptedException, ExecutionException {
        long id = this.putAlert(userID, msg, "warning", title).getId();
        this.sendNotifiaction(id, Long.toString(userID), msg, "warning", title);
    }

    /**
     * Sends info alert to a user and put this alert in data base
     * @param userID
     * @param msg - content od the alert
     * @param title
     * @throws InterruptedException
     * @throws ExecutionException
     */
    public void sendInfo(long userID, String msg, String title) throws InterruptedException, ExecutionException {
        long id = this.putAlert(userID, msg, "warning", title).getId();
        this.sendNotifiaction(id, Long.toString(userID), msg, "info", title);
    }

    /**
     * Sends succes alert to a user and put this alert in data base
     * @param userID
     * @param msg - content od the alert
     * @param title
     * @throws InterruptedException
     * @throws ExecutionException
     */
    public void sendSuccess(long userID, String msg, String title) throws InterruptedException, ExecutionException {
        long id = this.putAlert(userID, msg, "warning", title).getId();
        this.sendNotifiaction(id, Long.toString(userID), msg, "success", title);
    }

    /**
     * Sends error alert to a user and put this alert in data base
     * @param userID
     * @param msg - content od the alert
     * @param title
     * @throws InterruptedException
     * @throws ExecutionException
     */
    public void sendError(long userID, String msg, String title) throws InterruptedException, ExecutionException {
        long id = this.putAlert(userID, msg, "warning", title).getId();
        this.sendNotifiaction(id, Long.toString(userID), msg, "error", title);
    }

    // public void sendNotifiactionTopic(String topic, String msg, String level, String title) throws InterruptedException, ExecutionException 
    // {
    //     // long id = this.putAlert(userID, msg, "warning", title).getId();
    //     this.sendNotifiaction(topic, msg, level, title);
    // }

    /**
     * Returns json with notifications 
     * 
     * Json schema
     * {
     *  notifications:  [
     *         {
     *              //notifiactions1 json
     *              action: "showNotifications" //in case there was need to use notifications just for background notifiacions without front end
     *              // or use difrent notifications for difrent things (like succes after adding objective and we use material ui alerts insted of the main one) 
     *              //we simply omit this and main notifications system wont show this 
     *          },{},{},...
     *      ]
     * }
     * @param userID - which user notifications to return
     * @return
     */
    public JSONObject getNotification(long userID) {
        AppUser user = userRepository.findById(userID).get();
        List<Alert> alerts = alertRepository.findByUser(user);

        JSONObject newD = new JSONObject();

        JSONArray arr = new JSONArray();

        for (var a : alerts) {
            if (!a.isRead()) {
                JSONObject n = a.toJSON();
                n.put("action", "showNotification");
                arr.add(n);
            }
        }

        newD.put("notifications", arr);
        return newD;
    }

    /**
     * deletes notification
     * @param id 
     */
    public void deleteNotifications(Long id){
        alertRepository.deleteById(id);
    }

    // public void sentRemide(){
        
    // }

}
