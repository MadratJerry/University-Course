package pers.tam.flea.services;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.stereotype.Service;
import pers.tam.flea.entities.User;
import pers.tam.flea.repositories.UserRepository;

import javax.servlet.http.HttpSession;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User getCurrentUser(HttpSession session) {
        Authentication auth = ((SecurityContext) session.getAttribute("SPRING_SECURITY_CONTEXT")).getAuthentication();
        return (User) auth.getPrincipal();
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
