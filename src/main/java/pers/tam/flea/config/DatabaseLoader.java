package pers.tam.flea.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import pers.tam.flea.entities.*;
import pers.tam.flea.repositories.CategoryRepository;
import pers.tam.flea.repositories.ItemRepository;
import pers.tam.flea.repositories.RoleRepository;
import pers.tam.flea.repositories.UserRepository;

import java.util.Set;
import java.util.stream.Collectors;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final ItemRepository itemRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    public DatabaseLoader(UserRepository userRepository,
                          RoleRepository roleRepository,
                          ItemRepository itemRepository,
                          CategoryRepository categoryRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.itemRepository = itemRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(
                        "admin",
                        "admin",
                        AuthorityUtils.createAuthorityList("ROLE_ADMIN")));
        categoryRepository.saveAll(
                Set.of("游戏装备", "手机数码")
                        .stream()
                        .map(Category::new)
                        .collect(Collectors.toSet()));
        User testUser = userRepository.save(new User("test", "{noop}test",
                Set.of(roleRepository.save(new Role(RoleName.ROLE_USER)))));
        User adminUser = userRepository.save(new User("admin", "{noop}admin",
                Set.of(roleRepository.save(new Role(RoleName.ROLE_ADMIN)))));
        Item item1 = new Item();
        item1.setImages(Set.of(new Image("http://example.com")));
        Item item2 = new Item();
        testUser.setCollection(Set.of(item1, item2));
        testUser.setItems(Set.of(item1, item2));
        testUser.getItems().forEach(i -> i.setSeller(testUser));
        userRepository.save(testUser);
    }
}