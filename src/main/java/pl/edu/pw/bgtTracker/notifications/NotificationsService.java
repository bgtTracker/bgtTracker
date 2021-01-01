package pl.edu.pw.bgtTracker.notifications;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import com.google.api.client.json.Json;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import pl.edu.pw.bgtTracker.BgtTrackerApplication;

@Service
public class NotificationsService {
    private final FcmClient fcmClient;
    private JSONObject data;

    private Integer seq = 0;

    public NotificationsService(FcmClient fcmClient)
    {
        this.fcmClient = fcmClient;

        this.data = new JSONObject();
        JSONObject not1 =  new JSONObject();
        not1.put("id", 1);
        not1.put("title", "Error");
        not1.put("level", "error");        
        not1.put("msg", "alert");
        not1.put("read", false);
        JSONObject not2 =  new JSONObject();
        not2.put("id", 2);
        not2.put("title", "warning");
        not2.put("level", "warning");        
        not2.put("msg", "alert");
        not2.put("read", false);

        JSONObject not3 =  new JSONObject();
        not3.put("id", 3);
        not3.put("title", "success");
        not3.put("level", "success");        
        not3.put("msg", "alert");
        not3.put("read", false);

        JSONArray arr = new JSONArray();

        arr.add(not1);
        arr.add(not2);
        arr.add(not3);

        this.data.put("notifications", arr);
    }

    @Scheduled(fixedDelay = 10000, initialDelay = 2000)
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

    public JSONObject getNotification(int user)
    {
        JSONObject newD = new JSONObject();

        JSONArray arr = new JSONArray();

        ((JSONArray) this.data.get("notifications")).forEach(
            item -> {
                JSONObject obj = (JSONObject) item;
                System.out.println(obj.toJSONString());
                if((Boolean) obj.get("read") == false)
                {
                    arr.add(obj);
                }
            }
        );
        
        newD.put("notifications", arr);
        return newD;
    }

    public Boolean readNotifications(int id)
    {
        //to do place actual code
        ((JSONObject)(((JSONArray)(this.data.get("notifications"))).get(id))).replace("read", true);
        return true;
    }

}
