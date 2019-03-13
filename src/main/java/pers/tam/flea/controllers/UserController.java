package pers.tam.flea.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pers.tam.flea.entities.User;
import pers.tam.flea.repositories.UserRepository;

import javax.servlet.http.HttpSession;

@RestController
public class UserController {

    @GetMapping("/")
    public String index() {
        return "hello";
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER')")
    public User getUserInfo(HttpSession session) {
        Authentication auth = ((SecurityContext) session.getAttribute("SPRING_SECURITY_CONTEXT")).getAuthentication();
        User user = (User) auth.getPrincipal();
        user.setPassword("");
        return user;
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public String admin() {
        return "admin";
    }
}
