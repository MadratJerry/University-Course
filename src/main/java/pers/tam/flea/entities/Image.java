package pers.tam.flea.entities;


import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Image extends Model {

    private String url;

    public Image() {
    }

    public Image(String url) {
        setUrl(url);
    }
}
