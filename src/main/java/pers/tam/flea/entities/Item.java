package pers.tam.flea.entities;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Projection(name = "simple", types = {Item.class})
interface ItemSimpleProjection {

    Long getId();

    String getName();

    double getPrice();

    double getOriginalPrice();

    Address getLocation();

    List<Image> getImages();
}

@Projection(name = "detail", types = {Item.class})
interface ItemDetailProjection extends ItemSimpleProjection {

    String getDescription();

    User getSeller();

    Date getCreatedDate();

    @Value("#{@userRepository.countByCollectionId(target.id)}")
    Long getCollectByCount();

    Category getCategory();
}

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Item extends Model {

    private String name;

    private double price;

    private double originalPrice;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    private Address location;

    @OneToOne
    private Category category;

    @ManyToOne(cascade = CascadeType.ALL)
    private User seller;

    @ManyToMany(mappedBy = "collection")
    private Collection<User> collectedBy;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Image> images;

    @Column(columnDefinition = "TEXT")
    private String description;

    @OneToMany(cascade = CascadeType.ALL)
    private Collection<Comment> comments;
}
