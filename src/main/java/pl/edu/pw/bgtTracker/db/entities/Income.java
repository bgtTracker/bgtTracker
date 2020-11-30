package pl.edu.pw.bgtTracker.db.entities;

import lombok.Data;
import javax.persistence.*;

@Entity
@Data
public class Income {
    private @Id @GeneratedValue long id;
    private long amount;
    private String name;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne(optional = false)
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private IncomeCategory category;
}
