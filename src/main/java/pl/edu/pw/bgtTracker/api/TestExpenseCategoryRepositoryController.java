package pl.edu.pw.bgtTracker.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import pl.edu.pw.bgtTracker.db.entities.AppUser;
import pl.edu.pw.bgtTracker.db.entities.ExpenseCategory;
import pl.edu.pw.bgtTracker.db.repos.TestExpenseCategoryRepository;
import pl.edu.pw.bgtTracker.db.repos.UserRepository;

@RestController
public class TestExpenseCategoryRepositoryController
{
  @Autowired private TestExpenseCategoryRepository expenseCategoryRepository;
  @Autowired private UserRepository userRepository;

  @GetMapping(value={"/testapi/getexpensecategory"}, produces=MediaType.APPLICATION_JSON_VALUE)
  public JSONObject getExpenseCategory(Authentication auth)
  {
    AppUser user = userRepository.findByEmail(auth.getName());
    JSONObject data = new JSONObject();
    
    List<ExpenseCategory> categories = user.getExpenseCategories();

    JSONArray arr = new JSONArray();
    for(var c: categories)
    {
      arr.add(c.toJSON());
    }

    data.put("expenseCategories", arr);
    return data;
  }
}
