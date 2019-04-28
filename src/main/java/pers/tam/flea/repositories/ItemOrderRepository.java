package pers.tam.flea.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pers.tam.flea.entities.ItemOrder;

public interface ItemOrderRepository extends JpaRepository<ItemOrder, Long> {
}
