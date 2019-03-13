package pers.tam.flea.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pers.tam.flea.entities.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
