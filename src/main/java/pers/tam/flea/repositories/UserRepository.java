package pers.tam.flea.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import pers.tam.flea.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    Page<User> findAll(Pageable pageable);
}
