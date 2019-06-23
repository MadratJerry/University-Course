package pers.tam.flea.entities;

import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.data.rest.core.config.Projection;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import pers.tam.flea.repositories.ItemRepository;
import pers.tam.flea.repositories.UserRepository;

import javax.persistence.*;

@Projection(name = "detail", types = {ItemOrder.class})
interface ItemOrderDetailProjection {

    Long getId();

    ItemSimpleProjection getItem();

    ShippingAddressDetailProjection getShippingAddress();

    Double getPrice();

    String getBuyWay();

    String getOrderState();

    User getUser();
}

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@NoArgsConstructor
@RequiredArgsConstructor
public class ItemOrder extends Model {

    @NonNull
    @ManyToOne(cascade = CascadeType.ALL)
    private Item item;

    @NonNull
    @ManyToOne(cascade = CascadeType.ALL)
    private User user;

    @NonNull
    @ManyToOne
    private ShippingAddress shippingAddress;

    @NonNull
    private Double price;

    @NonNull
    @Enumerated(EnumType.STRING)
    private BuyWay buyWay;

    @NonNull
    @Enumerated(EnumType.STRING)
    private OrderState orderState;
}

@Component
@RepositoryEventHandler
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
class ItemOrderEventHandler {
    private final UserRepository userRepository;
    private final ItemRepository itemRepository;

    @HandleBeforeCreate
    public void handleItemOrderCreate(ItemOrder itemOrder) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
        User user = userRepository.findByUsername(userDetails.getUsername());
        itemOrder.setUser(user);
        itemOrder.setOrderState(OrderState.UNACCEPTED);
    }

    @HandleBeforeSave
    public void handleItemOrderSave(ItemOrder itemOrder) {
        if (itemOrder.getOrderState().equals(OrderState.FINISHED)) {
            Item item = itemRepository.getOne(itemOrder.getItem().getId());
            item.setItemState(ItemState.FINISHED);
        }
    }
}