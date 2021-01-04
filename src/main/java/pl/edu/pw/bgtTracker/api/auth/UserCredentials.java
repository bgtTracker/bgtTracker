package pl.edu.pw.bgtTracker.api.auth;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserCredentials {
    private String username;
    private String password;
}
