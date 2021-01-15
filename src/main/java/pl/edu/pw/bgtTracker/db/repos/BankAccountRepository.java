package pl.edu.pw.bgtTracker.db.repos;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import pl.edu.pw.bgtTracker.db.entities.BankAccount;

@RepositoryRestResource(exported = false)
public interface BankAccountRepository extends PagingAndSortingRepository<BankAccount, Long> {}
