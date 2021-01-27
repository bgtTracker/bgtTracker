package pl.edu.pw.bgtTracker.tests;

import org.junit.jupiter.api.extension.BeforeAllCallback;
import org.junit.jupiter.api.extension.ExtensionContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import pl.edu.pw.bgtTracker.db.entities.AppUser;
import pl.edu.pw.bgtTracker.db.repos.UserRepository;

public class RegisterUserExtension implements BeforeAllCallback {
    private static boolean started = false;

    @Override
    public void beforeAll(ExtensionContext context) {
        if (!started) {
            started = true;

            AppUser user = new AppUser();
            user.setEmail("test@test.test");
            user.setPassword("test");

            var users = (UserRepository) SpringExtension.getApplicationContext(context).getBean(UserRepository.class);
            users.save(user);
        }
    }
}
