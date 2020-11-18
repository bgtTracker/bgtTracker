package pl.edu.pw.bgtTracker.Entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="users")
@Getter @Setter @EqualsAndHashCode @ToString
public class User {
	private @Id @GeneratedValue Long id;
	private String login;
	private String password;

	private User() {}

	public User(String login, String password) {
		this.login = login;
		this.password = password;
	}
}
