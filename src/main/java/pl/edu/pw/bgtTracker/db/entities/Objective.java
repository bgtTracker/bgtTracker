package pl.edu.pw.bgtTracker.db.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import net.minidev.json.JSONObject;
import org.springframework.format.annotation.DateTimeFormat;
import pl.edu.pw.bgtTracker.db.entities.base.NamedEntity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Objective extends NamedEntity {

    private String description;

    private long amount;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date date;

    private long priority;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnore
    private AppUser user;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private ExpenseCategory category;

    public JSONObject toJSON() {
        JSONObject data = new JSONObject();

        data.put("id", id);
        data.put("name", name);
        data.put("description", description);
        data.put("priority", priority);
        data.put("date", date.getTime());
        data.put("categoryId", category.getId());
        data.put("category", category.getName());
        data.put("amount", amount);

        return data;
    }

}
