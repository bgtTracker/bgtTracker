package pl.edu.pw.bgtTracker.db.entities;

import lombok.Data;
import net.minidev.json.JSONObject;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class Alert {
    private @Id @GeneratedValue long id;
    private String title;
    private String content;
    private String level;
    private boolean read;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private AppUser user;

    public JSONObject toJSON()
    {
        JSONObject json = new JSONObject();
        json.put("id", Long.toString(id));
        json.put("title", title);
        json.put("msg", content);
        json.put("read", read);
        json.put("level", level);
        json.put("user", user.getId());

        return json;
    }
}
