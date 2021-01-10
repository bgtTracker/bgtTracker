package pl.edu.pw.bgtTracker.db.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
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
public class Bill {
    private @Id @GeneratedValue long id;
    private long amount;
    private String name;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dueDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date paymentDate;
    private String bankNumber;

    private boolean paid;
    private String note;

    @ManyToOne(optional = false)
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    @JsonIgnore
    private ExpenseCategory category;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnore
    private AppUser user;

    public JSONObject toJSON() {

        JSONObject json = new JSONObject();

        json.put("id", Long.toString(id));
        json.put("amount", amount);
        json.put("name", name);
        json.put("category", category.getName());
        json.put("category_id", category.getId());
        json.put("user", user.getId());

        DateFormat dateFromat = new SimpleDateFormat("dd.MM.yyyy"); // dobrze zwraca 20.12.2020
        String strDate = dateFromat.format(dueDate);
        json.put("date", strDate);
        if(paymentDate == null)
        {
            json.put("paymentDay","");
        }
        else{
            String strDate2 = dateFromat.format(paymentDate);
            json.put("paymentDay",strDate2);
        }
        json.put("bankAccount", bankNumber);
        json.put("isPaid", paid);
        json.put("note", note);

        return json;
    }
}
