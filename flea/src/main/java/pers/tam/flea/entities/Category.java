package pers.tam.flea.entities;

import lombok.*;

import javax.persistence.Entity;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@NoArgsConstructor
@RequiredArgsConstructor
public class Category extends Model {

    @NonNull
    private String name;
}
