package pers.tam.flea.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pers.tam.flea.entities.User;
import pers.tam.flea.repositories.UserRepository;

@RestController
public class UserController {

    private final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/")
    public String index() {
        return "hello";
    }

    @GetMapping("/user")
    public User getUserInfo() {
        User user = new User();
        user.setUsername("test");
        user.setPassword("test");
        return user;
    }
}
