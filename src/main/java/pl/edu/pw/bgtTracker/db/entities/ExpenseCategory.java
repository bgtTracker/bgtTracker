package pl.edu.pw.bgtTracker.db.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import net.minidev.json.JSONObject;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class ExpenseCategory {
    private @Id @GeneratedValue long id;
    private String name;
    private String color;
    private String note;

    @OneToMany(mappedBy = "category")
    private List<Expense> expenses = new ArrayList<>();

    @OneToMany(mappedBy = "category")
    private List<Bill> bills = new ArrayList<>();

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private AppUser user;

    public JSONObject toJSON(){
        JSONObject json = new JSONObject();
        json.put("id", Long.toString(id));
        json.put("name", name);
        json.put("color", color);
        json.put("note", note);
        return json;
    }
}
