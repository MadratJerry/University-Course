package pers.tam.flea.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.BasePathAwareController;
import org.springframework.hateoas.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pers.tam.flea.entities.Address;
import pers.tam.flea.entities.ShippingAddress;
import pers.tam.flea.entities.User;
import pers.tam.flea.repositories.ShippingAddressRepository;
import pers.tam.flea.repositories.UserRepository;
import pers.tam.flea.services.UserService;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

@BasePathAwareController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class UserController {

    private final UserService userService;
    private final ShippingAddressRepository shippingAddressRepository;
    private final UserRepository userRepository;

    @GetMapping("/user")
    public @ResponseBody
    ResponseEntity<?> getUserInfo(HttpSession session) {
        User user = userService.getCurrentUser(session);

        Resource<User> resource = new Resource<>(user);

        resource.add(linkTo(methodOn(UserController.class).getUserInfo(session)).withSelfRel());

        return ResponseEntity.ok(resource);
    }

    @PostMapping("/users/addShippingAddress")
    public @ResponseBody
    ResponseEntity<?> addShippingAddress(HttpSession session, @RequestBody Map<String, String> body) {
        ShippingAddress shippingAddress = new ShippingAddress(body.get("name"),
                new Address(body.get("province"), body.get("city"), body.get("country"), body.get("detail")),
                false,
                body.get("phone"));
        User user = userRepository.findByUsername(userService.getCurrentUser(session).getUsername());
        Collection<ShippingAddress> collection = user.getShippingAddresses();
        collection.add(shippingAddress);
        user.setShippingAddresses(collection);
        userRepository.save(user);
        return ResponseEntity.ok(null);
    }

    @DeleteMapping("/users/removeShippingAddress/{id}")
    public @ResponseBody
    ResponseEntity<?> removeShippingAddress(HttpSession session, @PathVariable Long id) {
        ShippingAddress shippingAddress = shippingAddressRepository.getOne(id);
        if (shippingAddress.getIsDefault()) {
            User user = userRepository.findByUsername(userService.getCurrentUser(session).getUsername());
            List<ShippingAddress> list = new ArrayList<>(user.getShippingAddresses());
            list.removeIf(a -> a.getId().equals(id));
            if (!list.isEmpty()) list.get(0).setIsDefault(true);
            user.setShippingAddresses(list);
            userRepository.save(user);
        }
        shippingAddressRepository.delete(shippingAddress);
        return ResponseEntity.ok(null);
    }

    @PatchMapping("/users/setShippingAddressDefault/{id}")
    public @ResponseBody
    ResponseEntity<?> setShippingAddressDefault(HttpSession session, @PathVariable Long id) {
        ShippingAddress shippingAddress = shippingAddressRepository.getOne(id);
        if (!shippingAddress.getIsDefault()) {
            User user = userRepository.findByUsername(userService.getCurrentUser(session).getUsername());
            Collection<ShippingAddress> collection = user.getShippingAddresses();
            collection.forEach(a -> {
                if (a.getIsDefault())
                    a.setIsDefault(false);
                if (a.getId().equals(id))
                    a.setIsDefault(true);
            });
            user.setShippingAddresses(collection);
            userRepository.save(user);
        }
        return ResponseEntity.ok(null);
    }
}
