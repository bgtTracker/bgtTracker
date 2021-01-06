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

    @OneToMany(mappedBy = "category")
    private List<Expense> expenses = new ArrayList<>();

    @OneToMany(mappedBy = "category")
    private List<Bill> bills = new ArrayList<>();

    @OneToMany(mappedBy = "category")
    private List<Objective> objectives = new ArrayList<>();

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private AppUser user;

    public JSONObject toJSON()
    {
        JSONObject data = new JSONObject();
        data.put("id", id);
        data.put("name", name);
        return data;
    }
}
