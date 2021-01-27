package pl.edu.pw.bgtTracker.db.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonIgnore
    private List<Expense> expenses = new ArrayList<>();

    @OneToMany(mappedBy = "category")
    @JsonIgnore
    private List<Bill> bills = new ArrayList<>();

    @OneToMany(mappedBy = "category")
    @JsonIgnore
    private List<Objective> objectives = new ArrayList<>();

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnore
    private AppUser user;

    /**
     * Returns single expense category object
     * 
     * {
     *      //expense category
     *      id: expense category id,
     *      name: expense category name,
     *      color: expense category color,
     *      note: expense category note
     * 
     * }
     * @return JSONObject
     */
    public JSONObject toJSON(){
        JSONObject json = new JSONObject();
        json.put("id", Long.toString(id));
        json.put("name", name);
        json.put("color", color);
        json.put("note", note);
        return json;
    }
}
