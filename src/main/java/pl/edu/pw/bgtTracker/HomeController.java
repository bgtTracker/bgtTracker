package pl.edu.pw.bgtTracker;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

public class HomeController {
    @RequestMapping(value = "/")
	public String index() {
		return "";
	}
}
