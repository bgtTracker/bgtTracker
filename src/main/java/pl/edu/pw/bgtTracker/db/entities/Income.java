package pl.edu.pw.bgtTracker.db.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import net.minidev.json.JSONObject;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class Income {
    private @Id @GeneratedValue long id;
    private long amount;
    private String name;
    //private Date dateStamp;
    //private String note;


    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private AppUser user;

    @ManyToOne(optional = false)
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private IncomeCategory category;

    public JSONObject toJSON(){
        JSONObject json = new JSONObject();
        json.put("id", Long.toString(id));
        json.put("name", name);
        json.put("amount", amount);
        json.put("category", category.getName());
        json.put("category_id", category.getId());
        json.put("user", user.getId());

        //json.put("expand", true); // not used
        //json.put("dateStamp", dateStamp);
        //json.put("note", note)

        json.put("date", "05.12.2020"); // stary format daty
        json.put("dateStamp", "2000-01-01");
        json.put("note", "Notatka kota filemona");
        return json;
    }
}
