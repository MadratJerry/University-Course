package pers.tam.flea.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import pers.tam.flea.entities.Item;
import pers.tam.flea.entities.Role;
import pers.tam.flea.entities.RoleName;
import pers.tam.flea.entities.User;
import pers.tam.flea.repositories.ItemRepository;
import pers.tam.flea.repositories.RoleRepository;
import pers.tam.flea.repositories.UserRepository;

import java.util.Set;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final ItemRepository itemRepository;

    @Autowired
    public DatabaseLoader(UserRepository userRepository,
                          RoleRepository roleRepository,
                          ItemRepository itemRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.itemRepository = itemRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        User testUser = userRepository.save(new User("test", "{noop}test",
                Set.of(roleRepository.save(new Role(RoleName.ROLE_USER)))));
        User adminUser = userRepository.save(new User("admin", "{noop}admin",
                Set.of(roleRepository.save(new Role(RoleName.ROLE_ADMIN)))));
        Item item = itemRepository.save(new Item());
        testUser.setCollection(Set.of(item));
        userRepository.save(testUser);
    }
}