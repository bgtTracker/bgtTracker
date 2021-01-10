package pl.edu.pw.bgtTracker.db.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Bank {
    private @Id @GeneratedValue long id;
    private String name;

    @OneToMany(mappedBy = "bank")
    @JsonIgnore
    private List<BankAccount> accounts = new ArrayList<>();
}
