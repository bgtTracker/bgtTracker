package pl.edu.pw.bgtTracker.api.notifications;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;

import net.minidev.json.JSONObject;
import pl.edu.pw.bgtTracker.BgtTrackerApplication;
import pl.edu.pw.bgtTracker.db.repos.UserRepository;
import pl.edu.pw.bgtTracker.db.entities.AppUser;
import pl.edu.pw.bgtTracker.api.notifications.FcmClient;


@RestController
@CrossOrigin
public class NotificationsController {

    private final FcmClient fcmClient;
    private final NotificationsService notificationsService;
    private final UserRepository userRepository;

    public NotificationsController(FcmClient fcmClient, NotificationsService notificationsService, UserRepository userRepository) {
        this.fcmClient = fcmClient;
        this.notificationsService = notificationsService;
        this.userRepository = userRepository;
    }

    /**
     * registers token from user, token is used to send notifications to correct browser
     * @param auth - auth needed to get a user and secure api
     * @param token - token to register
     * @return
     */
    @PostMapping("/api/pushsubscribe")
    public Long register(Authentication auth, @RequestParam(value = "token") String token) {
        String topic = Long.toString(this.getUserId(auth));
        BgtTrackerApplication.logger.info("Register topic: " + topic);
        this.fcmClient.subscribe(topic, token);
        return this.getUserId(auth);
    }

    /**
     * unsbsribisce token form notifications 
     * @param auth - auth needed to get a user and secure api
     * @param token token - token to register
     * @param topic
     */
    @PostMapping("/api/unsubscribe")
    public void unsubscribe(Authentication auth, @RequestParam(value = "token") String token, @RequestParam(value="topic") String topic)
    {
        AppUser user = userRepository.findByEmail(auth.getName());
        this.fcmClient.unsubscribe(topic, token);
        return;
    }

    /**
     * Returns JSON with all notifications for that user  
     * @param auth
     */
    @GetMapping(value = {"/api/getNotifications"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public JSONObject getNotifications(Authentication auth) {
        long id = this.getUserId(auth);
        BgtTrackerApplication.logger.info("Notifications requested for " + id);
        return notificationsService.getNotification(id);
    }

    /**
     * notifications has beed read, api used to to that
     * @param auth
     * @param id - id of the notifications that has been read
     */
    @PostMapping("/api/notificationsread")
    public void alertRead(Authentication auth, @RequestParam(value = "id") Long id) {
        notificationsService.deleteNotifications(id);
        BgtTrackerApplication.logger.info("Notifications has been reed " + id);
        //to do handle response correntyl
        return;
    }

    private long getUserId(Authentication auth) {
        AppUser u = userRepository.findByEmail(auth.getName());
        return u.getId();
    }
}