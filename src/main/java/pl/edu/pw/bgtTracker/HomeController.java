package pl.edu.pw.bgtTracker;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
    @RequestMapping(value = {"/", "/dashboard", "/stats", "/expenses", "/incomes", "/bills",  "/objectives",
			"/comments", "/accounts", "/settings", "/charts", "/history", "/summary"})
	public String index() {
		return "index.html";
	}
}
