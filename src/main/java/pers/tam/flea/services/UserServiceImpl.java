package pers.tam.flea.services;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.stereotype.Service;
import pers.tam.flea.entities.User;

import javax.servlet.http.HttpSession;

@Service
public class UserServiceImpl implements UserService {

    @Override
    public User getCurrentUser(HttpSession session) {
        Authentication auth = ((SecurityContext) session.getAttribute("SPRING_SECURITY_CONTEXT")).getAuthentication();
        return (User) auth.getPrincipal();
    }
}
