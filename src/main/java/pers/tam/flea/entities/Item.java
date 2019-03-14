package pers.tam.flea.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    @ManyToMany(mappedBy = "collection")
    @JsonIgnoreProperties(value = "collection")
    private Collection<User> collectedBy;

    @Column(columnDefinition = "TEXT")
    private String description;
}
