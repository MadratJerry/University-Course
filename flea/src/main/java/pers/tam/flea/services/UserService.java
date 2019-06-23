package pers.tam.flea.services;

import org.springframework.security.access.prepost.PreAuthorize;
import pers.tam.flea.entities.User;

import javax.servlet.http.HttpSession;

public interface UserService {

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    User getCurrentUser(HttpSession session);
}
