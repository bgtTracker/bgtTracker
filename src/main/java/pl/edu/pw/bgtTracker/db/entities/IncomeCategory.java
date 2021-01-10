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
public class IncomeCategory {
    private @Id @GeneratedValue long id;
    private String name;

    @OneToMany(mappedBy = "category")
    @JsonIgnore
    private List<Income> incomes = new ArrayList<>();

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnore
    private AppUser user;
}
