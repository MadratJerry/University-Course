package pers.tam.flea.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import pers.tam.flea.entities.Category;

public interface CategoryRepository extends CrudRepository<Category, Long> {

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    <S extends Category> S save(S entity);

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    void delete(Category entity);
}
