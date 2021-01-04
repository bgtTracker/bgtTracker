package pl.edu.pw.bgtTracker.db.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class IncomeCategory {
    private @Id @GeneratedValue long id;
    private String name;

    @OneToMany(mappedBy = "category")
    private List<Income> incomes = new ArrayList<>();
}
