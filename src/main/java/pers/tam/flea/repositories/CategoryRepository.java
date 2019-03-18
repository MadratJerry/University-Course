package pers.tam.flea.repositories;

import org.springframework.data.repository.CrudRepository;
import pers.tam.flea.entities.Category;

public interface CategoryRepository extends CrudRepository<Category, Long> {
}
