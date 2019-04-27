package pers.tam.flea.entities;


import lombok.*;
import org.springframework.data.rest.core.config.Projection;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToOne;

@Projection(name = "detail", types = {ShippingAddress.class})
interface ShippingAddressDetailProjection {

    Long getId();

    String getName();

    Address getAddress();

    boolean getIsDefault();

    String getPhoneNumber();
}

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@NoArgsConstructor
@RequiredArgsConstructor
public class ShippingAddress extends Model {

    @NonNull
    private String name;

    @OneToOne(cascade = CascadeType.ALL)
    @NonNull
    private Address address;

    @NonNull
    private Boolean isDefault;

    @NonNull
    private String phoneNumber;
}
