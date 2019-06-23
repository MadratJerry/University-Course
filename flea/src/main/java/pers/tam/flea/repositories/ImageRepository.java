package pers.tam.flea.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pers.tam.flea.entities.Image;

public interface ImageRepository extends JpaRepository<Image, Long> {

    Image findByUrl(String url);
}
