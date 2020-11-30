package pl.edu.pw.bgtTracker.db.entities;

import lombok.Data;
import javax.persistence.*;
import java.util.Date;

@Entity
@Data
public class Objective {
    private @Id @GeneratedValue long id;
    private String name;
    private String description;
    private long amount;
    private Date date;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}
