package pers.tam.flea.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pers.tam.flea.entities.ItemOrder;
import pers.tam.flea.entities.OrderState;

import java.util.List;
import java.util.Set;

public interface ItemOrderRepository extends JpaRepository<ItemOrder, Long> {

    List<ItemOrder> findByItemId(Long id);

    Long countByItemIdAndOrderStateNotIn(Long id, Set<OrderState> orderStates);
}
