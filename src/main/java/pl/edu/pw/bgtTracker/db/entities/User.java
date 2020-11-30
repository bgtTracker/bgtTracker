package pl.edu.pw.bgtTracker.db.entities;

import lombok.Data;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "Users")
@Data
public class User {
	private @Id @GeneratedValue long id;
	private String login;
	private String passwordHash;
	private String passwordSalt;
	private String firstName;
	private String lastName;
	private String email;
	private Date birthDate;

	@OneToMany(mappedBy = "user")
	private List<Alert> alerts = new ArrayList<>();

	@OneToMany(mappedBy = "user")
	private List<BankAccount> accounts = new ArrayList<>();

	@OneToMany(mappedBy = "user")
	private List<Bill> bills = new ArrayList<>();

	@OneToMany(mappedBy = "user")
	private List<Comment> comments = new ArrayList<>();

	@OneToMany(mappedBy = "user")
	private List<Expense> expenses = new ArrayList<>();

	@OneToMany(mappedBy = "user")
	private List<Income> incomes = new ArrayList<>();

	@OneToMany(mappedBy = "user")
	private List<Objective> objectives = new ArrayList<>();

	@ManyToMany
	@JoinTable(
			name = "user_expense_categories",
			joinColumns = @JoinColumn(name = "expense_category_id", referencedColumnName = "id"),
			inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id")
	)
	private List<ExpenseCategory> expenseCategories = new ArrayList<>();

	@ManyToMany
	@JoinTable(
			name = "user_income_categories",
			joinColumns = @JoinColumn(name = "income_category_id", referencedColumnName = "id"),
			inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id")
	)
	private List<IncomeCategory> incomeCategories = new ArrayList<>();
}
