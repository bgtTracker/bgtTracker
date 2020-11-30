package pl.edu.pw.bgtTracker.db.entities;

import lombok.Data;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class IncomeCategory {
    private @Id @GeneratedValue long id;
    private String name;

    @OneToMany(mappedBy = "category")
    private List<Income> incomes = new ArrayList<>();
}
