package pl.edu.pw.bgtTracker;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@EnableScheduling
public class BgtTrackerApplication {

	public static final Logger logger = LoggerFactory.getLogger("pl.edu.pw.bgtTracker");

	public static void main(String[] args) {
		SpringApplication.run(BgtTrackerApplication.class, args);
	}
}
