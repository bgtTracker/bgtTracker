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
public class IncomeCategory {
    private @Id @GeneratedValue long id;
    private String name;
    private String note;
    private String color;

    @OneToMany(mappedBy = "category")
    @JsonIgnore
    private List<Income> incomes = new ArrayList<>();

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnore
    private AppUser user;

    /**
     * Returns single income category object
     * {
     *      //income category
     *      id: income category id,
     *      name: income category name,
     *      color: income category color,
     *      note: income category note
     * }
     * @return JSONObject
     */
    public JSONObject toJSON(){
        JSONObject json = new JSONObject();
        json.put("id", Long.toString(id));
        json.put("name", name);
        json.put("note", note);
        json.put("color", color);
        return json;
    }
}
