package pl.edu.pw.bgtTracker.db.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class Income {
    private @Id @GeneratedValue long id;
    private long amount;
    private String name;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnore
    private AppUser user;

    @ManyToOne(optional = false)
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    @JsonIgnore
    private IncomeCategory category;
}
