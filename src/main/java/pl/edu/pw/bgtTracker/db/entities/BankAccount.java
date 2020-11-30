package pl.edu.pw.bgtTracker.db.entities;

import lombok.Data;
import javax.persistence.*;

@Entity
@Data
public class BankAccount {
    private @Id @GeneratedValue long id;
    private String number;
    private String name;
    private boolean active;

    @ManyToOne
    @JoinColumn(name = "bank_id", referencedColumnName = "id")
    private Bank bank;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}
