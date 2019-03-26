package pers.tam.flea.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import pers.tam.flea.entities.Item;


public interface ItemRepository extends JpaRepository<Item, Long> {

    Page<Item> findByCategoryNameContains(@Param("category") String name, Pageable pageable);
}
