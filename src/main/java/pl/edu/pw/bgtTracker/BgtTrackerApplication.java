package pl.edu.pw.bgtTracker;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@EnableScheduling
public class BgtTrackerApplication {

    public static final Logger logger = LoggerFactory.getLogger("pl.edu.pw.bgtTracker");

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public static void main(String[] args) {
        SpringApplication.run(BgtTrackerApplication.class, args);
    }
}
