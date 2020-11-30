package pl.edu.pw.bgtTracker.db.entities;

import lombok.Data;
import javax.persistence.*;
import java.util.Date;

@Entity
@Data
public class Comment {
    private @Id @GeneratedValue long id;
    private String title;
    private String content;
    private Date date;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}
