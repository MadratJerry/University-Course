package pers.tam.flea.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Projection(name = "simple", types = {Item.class})
interface Simple {

    Long getId();

    String getName();

    double getPrice();

    double getOriginalPrice();

    String getLocation();

    List<Image> getImages();
}

@Projection(name = "detail", types = {Item.class})
interface Full extends Simple {

    Long getId();

    String getName();

    double getPrice();

    double getOriginalPrice();

    String getLocation();

    List<Image> getImages();

    User getSeller();

    Date getCreatedDate();

    @Value("#{@userRepository.countByCollectionId(target.id)}")
    Long getCollectByCount();
}

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Item extends Model {

    private String name;

    private double price;

    private double originalPrice;

    private String location;

    @OneToOne
    private Category category;

    @ManyToOne(cascade = CascadeType.ALL)
    @JsonIgnoreProperties(value = {"collection", "items"})
    private User seller;

    @ManyToMany(mappedBy = "collection")
    @JsonIgnoreProperties(value = {"collection", "items"})
    private Collection<User> collectedBy;

    @OneToMany(cascade = CascadeType.ALL)
    private Collection<Image> images;

    @Column(columnDefinition = "TEXT")
    private String description;
}
