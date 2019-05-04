package pers.tam.flea.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.format.annotation.DateTimeFormat;
import pers.tam.flea.entities.Item;
import pers.tam.flea.entities.ItemState;

import java.util.Date;


public interface ItemRepository extends JpaRepository<Item, Long> {

    Page<Item> findByCategoryNameContainsAndPriceBetweenAndCreatedDateAfter(
            String category,
            Double priceLow,
            Double priceHigh,
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date createdDate,
            Pageable pageable);

    Page<Item> findBySellerIdAndItemState(Long id, ItemState itemState, Pageable pageable);
}
