package pl.edu.pw.bgtTracker.db.entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import net.minidev.json.JSONObject;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class Currency {
  private @Id @GeneratedValue long id;
  private String name;

  @ManyToOne(optional = false)
  @JoinColumn(name = "user_id", referencedColumnName = "id")
  @JsonIgnore
  private AppUser user;

  public JSONObject toJSON()
  {
    JSONObject obj = new JSONObject();
    obj.put("id", id);
    obj.put("name", name);
    return obj;
  }
}
