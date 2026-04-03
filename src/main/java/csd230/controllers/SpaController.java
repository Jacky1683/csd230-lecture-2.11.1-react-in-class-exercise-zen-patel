package csd230.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaController {

    @GetMapping(value = {"/", "/login", "/inventory", "/magazines", "/add", "/add-magazine"})
    public String forwardRoutes() {
        return "forward:/index.html";
    }
}