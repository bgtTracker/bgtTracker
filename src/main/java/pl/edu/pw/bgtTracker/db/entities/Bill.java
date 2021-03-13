package pl.edu.pw.bgtTracker.db.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import net.minidev.json.JSONObject;
import org.springframework.format.annotation.DateTimeFormat;
import pl.edu.pw.bgtTracker.db.entities.base.NamedEntity;

import javax.persistence.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Bill extends NamedEntity {

    private long amount;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Date dueDate;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Date paymentDate;

    private String bankNumber;

    private boolean paid;

    private String note;

    @ManyToOne(optional = false)
    @JoinColumn(name = "category_id", referencedColumnName = "id")
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
