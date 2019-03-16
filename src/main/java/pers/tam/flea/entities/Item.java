package pers.tam.flea.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.Collection;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Item extends Model {

    private String name;

    private double price;

    private double originalPrice;

    private String location;

    @ManyToOne(cascade = CascadeType.ALL)
    @JsonIgnoreProperties(value = {"collection", "items"})
    private User seller;


    @ManyToMany(mappedBy = "collection")
    @JsonIgnoreProperties(value = {"collection", "items"})
    private Collection<User> collectedBy;

    @Column(columnDefinition = "TEXT")
    private String description;
}
