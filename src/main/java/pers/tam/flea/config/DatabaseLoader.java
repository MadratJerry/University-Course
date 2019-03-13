package pers.tam.flea.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import pers.tam.flea.entities.Role;
import pers.tam.flea.entities.RoleName;
import pers.tam.flea.entities.User;
import pers.tam.flea.repositories.RoleRepository;
import pers.tam.flea.repositories.UserRepository;

import java.util.Set;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Autowired
    public DatabaseLoader(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        userRepository.save(new User("test", "{noop}test",
                Set.of(roleRepository.save(new Role(RoleName.ROLE_USER)))));
        userRepository.save(new User("admin", "{noop}admin",
                Set.of(roleRepository.save(new Role(RoleName.ROLE_ADMIN)))));
    }
}