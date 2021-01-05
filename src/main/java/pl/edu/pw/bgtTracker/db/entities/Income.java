package pl.edu.pw.bgtTracker.db.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.json.JSONObject;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class Income {
    private @Id @GeneratedValue long id;
    private long amount;
    private String name;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private AppUser user;

    @ManyToOne(optional = false)
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private IncomeCategory category;

    public JSONObject toJSON(){
        JSONObject json = new JSONObject();
        json.put("id", Long.toString(id));
        json.put("amount", amount);
        json.put("name", name);
        json.put("category", category.getId());
        json.put("user", user.getId());
        return json;
    }
}
