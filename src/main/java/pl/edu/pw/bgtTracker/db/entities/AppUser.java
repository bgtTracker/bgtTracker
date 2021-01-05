package pl.edu.pw.bgtTracker.db.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@ToString(exclude = "password")
@NoArgsConstructor
public class AppUser {
	private @Id @GeneratedValue long id;
	@Column(unique = true)
	private String email;
	private String password;
	private String firstName;
	private String lastName;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Alert> alerts = new ArrayList<>();

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<BankAccount> accounts = new ArrayList<>();

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Bill> bills = new ArrayList<>();

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Comment> comments = new ArrayList<>();

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Expense> expenses = new ArrayList<>();

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Income> incomes = new ArrayList<>();

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Objective> objectives = new ArrayList<>();

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<ExpenseCategory> expenseCategories = new ArrayList<>();

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<IncomeCategory> incomeCategories = new ArrayList<>();

	public String toString()
	{
		return id + " " + firstName + " " + lastName;
	}
	
	public AppUser(String email, String password, String firstName, String lastName) {
		this.email = email;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
	}
}
