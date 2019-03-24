package pers.tam.flea.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pers.tam.flea.entities.Item;


public interface ItemRepository extends JpaRepository<Item, Long> {
}
