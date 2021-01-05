package pl.edu.pw.bgtTracker.db.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import net.minidev.json.JSONObject;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
public class Objective {
    private @Id @GeneratedValue long id;
    private String name;
    private String description;
    private long amount;
    private Date date;
    private int priority;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private AppUser user;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private ExpenseCategory category;

    public JSONObject toJSON()
    {
        JSONObject data = new JSONObject();

        data.put("id", id);
        data.put("name", name);
        data.put("description", description);
        data.put("priority", priority);
        data.put("date", date.getTime());
        data.put("category-id", category.getId());
        data.put("category", category.getName());
        data.put("amount", amount);
        
        return data;
    }

}
