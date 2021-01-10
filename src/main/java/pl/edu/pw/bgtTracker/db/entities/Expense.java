package pl.edu.pw.bgtTracker.db.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
public class Expense {
    private @Id @GeneratedValue long id;
    private long amount;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date date;
    private String name;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnore
    private AppUser user;

    @ManyToOne(optional = false)
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    @JsonIgnore
    private ExpenseCategory category;
}
