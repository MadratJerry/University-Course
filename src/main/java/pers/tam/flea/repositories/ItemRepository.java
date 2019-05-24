package pers.tam.flea.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.format.annotation.DateTimeFormat;
import pers.tam.flea.entities.Item;
import pers.tam.flea.entities.ItemState;

import java.util.Date;
import java.util.Set;


public interface ItemRepository extends JpaRepository<Item, Long> {

    Page<Item> findByNameContainsAndCategoryNameContainsAndPriceBetweenAndCreatedDateAfterAndItemStateIn(
            String name,
            String category,
            Double priceLow,
            Double priceHigh,
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date createdDate,
            Set<ItemState> itemStates,
            Pageable pageable);

    Page<Item> findBySellerIdAndItemState(Long id, ItemState itemState, Pageable pageable);
}
