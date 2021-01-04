package pl.edu.pw.bgtTracker.db.entities;

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
    private List<BankAccount> accounts = new ArrayList<>();
}
