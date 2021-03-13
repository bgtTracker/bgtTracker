package pl.edu.pw.bgtTracker.db.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import net.minidev.json.JSONObject;
import lombok.NoArgsConstructor;
import pl.edu.pw.bgtTracker.db.entities.base.NamedEntity;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Currency extends NamedEntity {
  @ManyToOne(optional = false)
  @JoinColumn(name = "user_id", referencedColumnName = "id")
  @JsonIgnore
  private AppUser user;

  public String toString(){
    return name;
  }
  
  public JSONObject toJSON()
  {
    JSONObject obj = new JSONObject();
    obj.put("id", id);
    obj.put("name", name);
    return obj;
  }
}
