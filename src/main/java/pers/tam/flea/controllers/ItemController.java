package pers.tam.flea.controllers;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.BasePathAwareController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import pers.tam.flea.entities.*;
import pers.tam.flea.repositories.ItemOrderRepository;
import pers.tam.flea.repositories.ItemRepository;
import pers.tam.flea.repositories.ShippingAddressRepository;
import pers.tam.flea.repositories.UserRepository;
import pers.tam.flea.services.UserService;

import javax.servlet.http.HttpSession;
import java.util.Collection;
import java.util.Map;

@BasePathAwareController
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ItemController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final ShippingAddressRepository shippingAddressRepository;
    private final ItemOrderRepository itemOrderRepository;
    private final ItemRepository itemRepository;

    @PostMapping("/items/{id}/addOrder")
    public @ResponseBody
    ResponseEntity<?> addOrder(HttpSession session, @RequestBody Map<String, String> body, @PathVariable Long id) {
        User user = userRepository.findByUsername(userService.getCurrentUser(session).getUsername());
        Item item = itemRepository.getOne(id);
        ShippingAddress shippingAddress = shippingAddressRepository.getOne(Long.valueOf(body.get("shippingAddress")));
        ItemOrder itemOrder = new ItemOrder(item,
                user,
                shippingAddress,
                Double.valueOf(body.get("price")),
                BuyWay.valueOf(body.get("buyWay")),
                OrderState.UNACCEPTED
        );
        Collection<ItemOrder> collection = user.getItemOrders();
        collection.add(itemOrder);
        userRepository.save(user);
        return ResponseEntity.ok(null);
    }
}
