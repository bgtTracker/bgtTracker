package pl.edu.pw.bgtTracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@SpringBootApplication
@RestController
public class BgtTrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(BgtTrackerApplication.class, args);
	}

	// @GetMapping("/")
	// public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
	// 	return String.format("Welcome on Pap project site", name);
	// }


}
