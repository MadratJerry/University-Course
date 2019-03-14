package pers.tam.flea.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pers.tam.flea.entities.User;
import pers.tam.flea.services.UserService;

import javax.servlet.http.HttpSession;

@RestController
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user")
    public User getUserInfo(HttpSession session) {
        return userService.getCurrentUser(session);
    }
}
