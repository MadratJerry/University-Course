package pers.tam.flea.repositories;

import org.springframework.data.repository.CrudRepository;
import pers.tam.flea.entities.User;

public interface UserRepository extends CrudRepository<User, Long> {
    User findByUsernameAndPassword(String username, String password);
}
