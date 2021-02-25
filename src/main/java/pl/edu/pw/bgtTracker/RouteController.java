package pl.edu.pw.bgtTracker;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class RouteController {

    @RequestMapping(value = { "/login", "/register", "/app", "/app/*" })
    public String redirect() {
        return "forward:/";
    }
}
