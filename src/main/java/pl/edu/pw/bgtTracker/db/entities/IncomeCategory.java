package pl.edu.pw.bgtTracker.db.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import net.minidev.json.JSONObject;
import pl.edu.pw.bgtTracker.db.entities.base.NamedEntity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class IncomeCategory extends NamedEntity {

    @Column(nullable = false)
    @NotNull(message = "Color must not be null")
    private String color;

    private String note;

    @OneToMany(mappedBy = "category")
    @JsonIgnore
    private List<Income> incomes = new ArrayList<>();

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnore
    private AppUser user;

    public JSONObject toJSON(){
        JSONObject json = new JSONObject();
        json.put("id", Long.toString(id));
        json.put("name", name);
        json.put("note", note);
        json.put("color", color);
        return json;
    }
}
