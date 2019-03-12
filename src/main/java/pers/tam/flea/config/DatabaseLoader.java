package pers.tam.flea.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import pers.tam.flea.entities.User;
import pers.tam.flea.repositories.UserRepository;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final UserRepository userRepository;
//    private final RoleRepository roleRepository;

    @Autowired
    public DatabaseLoader(UserRepository userRepository/*,RoleRepository roleRepository*/) {
        this.userRepository = userRepository;
//        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) throws Exception {
//        Role roleUser = roleRepository.save(new Role(RoleName.USER));
//        Role roleAdmin = roleRepository.save(new Role(RoleName.ADMIN));

//        Set<Role> userRoles = new HashSet<>();
//        userRoles.add(roleUser);
        User user = new User("test", "{noop}test"/*, userRoles*/);

//        Set<Role> adminRoles = new HashSet<>();
//        adminRoles.add(roleAdmin);
        User admin = new User("admin", "{noop}admin"/*, adminRoles*/);
        userRepository.save(user);
        userRepository.save(admin);
    }
}