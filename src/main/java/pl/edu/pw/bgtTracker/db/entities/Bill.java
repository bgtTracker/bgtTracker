package pl.edu.pw.bgtTracker.db.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import net.minidev.json.JSONObject;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
public class Bill {
    private @Id @GeneratedValue long id;
    private long amount;
    private String name;

    private Date dueDate;
    private Date paymentDate;
    private boolean paid;

    //private String note;

    @ManyToOne(optional = false)
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private ExpenseCategory category;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private AppUser user;

    public JSONObject toJSON() {

        JSONObject json = new JSONObject();

        json.put("id", Long.toString(id));
        json.put("amount", amount);
        json.put("name", name);
        json.put("category", category.getName());
        json.put("category_id", category.getId());
        json.put("user", user.getId());
        if(dueDate == null)
        {
            json.put("XD","yes it is");
        }
        //json.put("dueDate", dueDate.getTime());
        //json.put("paymentDate", paymentDate.getTime());
        json.put("isPaid", paid);

        //json.put("note", note);

        //.put("expand", true);
        json.put("note", "Notatka kota filemlotka");
        json.put("date", "05.12.2020");

        return json;
    }
}
