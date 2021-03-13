package pl.edu.pw.bgtTracker.db.repos;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import pl.edu.pw.bgtTracker.db.entities.Bank;

@RepositoryRestResource(exported = false)
public interface BankRepository extends PagingAndSortingRepository<Bank, Long> {
    Bank findByName(String name);
}
