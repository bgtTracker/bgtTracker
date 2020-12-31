package pl.edu.pw.bgtTracker.db.entities;

import lombok.Data;
import javax.persistence.*;

@Entity
@Data
public class Alert {
    private @Id @GeneratedValue long id;
    private String title;
    private String content;
    private String level;
    private boolean read;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}
