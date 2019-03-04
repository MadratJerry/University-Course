package pers.tam.flea.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import pers.tam.flea.entities.User;
import pers.tam.flea.repositories.UserRepository;

@RestController
public class LoginController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public @ResponseBody
    ResponseEntity<User> login(@RequestBody User body) {
        User user = userRepository.findByUsernameAndPassword(body.getUsername(), body.getPassword());
        if (user !=null) user.setPassword("******");

        return user == null ? ResponseEntity.status(HttpStatus.FORBIDDEN).body(null) :
                ResponseEntity.ok().body(user);
    }
}
