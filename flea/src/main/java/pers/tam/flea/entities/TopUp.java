package pers.tam.flea.entities;


import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.rest.core.config.Projection;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;

@Projection(name = "detail", types = {TopUp.class})
interface TopUpDetailProjection {

    Long getId();

    User getUser();

    Double getMoney();
}

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@NoArgsConstructor
public class TopUp extends Model {

    @ManyToOne
    private User user;

    private Double money;
}