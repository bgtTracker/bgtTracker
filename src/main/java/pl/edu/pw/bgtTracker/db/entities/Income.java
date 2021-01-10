package pl.edu.pw.bgtTracker.db.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.minidev.json.JSONObject;

import javax.persistence.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
public class Income {
    private @Id @GeneratedValue long id;
    private long amount;
    private Date date;
    private String name;
    private String note;


    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnore
    private AppUser user;

    @ManyToOne(optional = false)
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    @JsonIgnore
    private IncomeCategory category;

    public JSONObject toJSON(){
        JSONObject json = new JSONObject();
        json.put("id", Long.toString(id));
        json.put("name", name);
        json.put("amount", amount);
        json.put("category", category.getName());
        json.put("category_id", category.getId());
        json.put("user", user.getId());
        // mozna dodac if - a sprawdzajacego czy nie null
        DateFormat dateFromat = new SimpleDateFormat("dd.MM.yyyy"); // dobrze zwraca 20.12.2020
        String strDate = dateFromat.format(date);

        json.put("date", strDate);
        json.put("note", note);
        json.put("dataStamp", date);

        return json;
    }
}
