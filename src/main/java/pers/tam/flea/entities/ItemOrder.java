package pers.tam.flea.entities;

import lombok.*;

import javax.persistence.*;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@NoArgsConstructor
@RequiredArgsConstructor
public class ItemOrder extends Model {

    @NonNull
    @ManyToOne
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
