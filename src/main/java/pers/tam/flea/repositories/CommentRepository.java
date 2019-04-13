package pers.tam.flea.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pers.tam.flea.entities.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
