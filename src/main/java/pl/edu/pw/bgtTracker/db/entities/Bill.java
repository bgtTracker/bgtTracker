package pl.edu.pw.bgtTracker.db.entities;

import lombok.Data;
import javax.persistence.*;
import java.net.UnknownServiceException;
import java.util.Date;

@Entity
@Data
public class Bill {
    private @Id @GeneratedValue long id;
    private long amount;
    private String name;
    private Date dueDate;
    private Date paymentDate;
    private boolean paid;

    @ManyToOne(optional = false)
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private ExpenseCategory category;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}
