package pl.edu.pw.bgtTracker.db.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import net.minidev.json.JSONObject;
import lombok.NoArgsConstructor;
import pl.edu.pw.bgtTracker.db.entities.base.BaseEntity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Alert extends BaseEntity {

    @Column(nullable = false)
    @NotNull(message = "Title must not be null")
    private String title;

    private String content;

    private String level;

    private boolean read;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnore
    private AppUser user;

    public JSONObject toJSON() {
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
