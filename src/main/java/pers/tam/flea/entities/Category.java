package pers.tam.flea.entities;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Category extends Model {

    private String name;

    public Category() {
    }

    public Category(String name) {
        setName(name);
    }
}
