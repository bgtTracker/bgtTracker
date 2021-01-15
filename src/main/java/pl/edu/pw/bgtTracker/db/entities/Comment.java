package pl.edu.pw.bgtTracker.db.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.minidev.json.JSONObject;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
public class Comment {
    private @Id @GeneratedValue long id;
    private String title;
    private String content;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date date;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnore
    private AppUser user;

    public JSONObject toJSON()
    {
        JSONObject obj = new JSONObject();
        obj.put("id", id);
        obj.put("title", title);
        obj.put("contnet", content);
        obj.put("date", date.toString());
        obj.put("dateStamp", date.getTime());
        obj.put("user", user.getId());
        return obj;
    }
}
