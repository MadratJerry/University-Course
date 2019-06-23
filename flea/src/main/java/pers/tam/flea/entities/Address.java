package pers.tam.flea.entities;


import lombok.*;

import javax.persistence.Entity;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@NoArgsConstructor
@RequiredArgsConstructor
public class Address extends Model {

    @NonNull
    private String province;

    @NonNull
    private String city;

    @NonNull
    private String country;

    @NonNull
    private String detail;
}
