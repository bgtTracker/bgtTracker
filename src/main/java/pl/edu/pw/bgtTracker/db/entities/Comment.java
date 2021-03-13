package pl.edu.pw.bgtTracker.db.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import net.minidev.json.JSONObject;
import org.springframework.format.annotation.DateTimeFormat;
import pl.edu.pw.bgtTracker.db.entities.base.BaseEntity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Comment extends BaseEntity {

    @Column(nullable = false)
    @NotNull(message = "Title must not be null")
    private String title;

    @Column(columnDefinition = "varchar (10000)")
    private String content;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
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
