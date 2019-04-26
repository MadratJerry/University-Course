package pers.tam.flea.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import pers.tam.flea.entities.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @PreAuthorize("hasRole('USER')")
    @Override
    <S extends Comment> S save(S entity);
}
