package pl.edu.pw.bgtTracker.db.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class ExpenseCategory {
    private @Id @GeneratedValue long id;
    private String name;

    @OneToMany(mappedBy = "category")
    private List<Expense> expenses = new ArrayList<>();

    @OneToMany(mappedBy = "category")
    private List<Bill> bills = new ArrayList<>();
}
