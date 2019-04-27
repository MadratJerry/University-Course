package pers.tam.flea.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pers.tam.flea.entities.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
