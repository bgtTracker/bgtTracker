// package pl.edu.pw.bgtTracker.db.entities;

// import com.fasterxml.jackson.annotation.JsonIgnore;
// import lombok.Data;
// import net.minidev.json.JSONObject;
// import lombok.NoArgsConstructor;

// import javax.persistence.*;

// @Entity
// @Data
// @NoArgsConstructor
// public class Limit {
//     private @Id @GeneratedValue long id;
//     private long amount;

//     // @OneToOne
//     // @JoinColumn(name = "user_id", referencedColumnName = "id")
//     // @JsonIgnore
//     // private AppUser user;

//     public JSONObject toJSON() {
//         JSONObject json = new JSONObject();
//         json.put("id", id);
//         json.put("amount", amount);
//         return json;
//     }
// }