package pers.tam.flea;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class FleaApplication {

    public static void main(String[] args) {
        SpringApplication.run(FleaApplication.class, args);
    }

}
