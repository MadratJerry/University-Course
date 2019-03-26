package pers.tam.flea.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.BasePathAwareController;
import org.springframework.hateoas.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import pers.tam.flea.entities.User;
import pers.tam.flea.services.UserService;

import javax.servlet.http.HttpSession;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

@BasePathAwareController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class UserController {

    private final UserService userService;

    @GetMapping("/user")
    public @ResponseBody
    ResponseEntity<?> getUserInfo(HttpSession session) {
        User user = userService.getCurrentUser(session);

        Resource<User> resource = new Resource<>(user);

        resource.add(linkTo(methodOn(UserController.class).getUserInfo(session)).withSelfRel());

        return ResponseEntity.ok(resource);
    }
}
