package pers.tam.flea.services;

import org.springframework.security.access.prepost.PreAuthorize;
import pers.tam.flea.entities.User;

import javax.servlet.http.HttpSession;
import java.util.List;

public interface UserService {

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    User getCurrentUser(HttpSession session);

    @PreAuthorize("hasRole('ADMIN')")
    List<User> getAllUsers();
}
