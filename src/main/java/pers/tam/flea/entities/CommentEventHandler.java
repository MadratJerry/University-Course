package pers.tam.flea.entities;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import pers.tam.flea.repositories.UserRepository;

@Component
@RepositoryEventHandler
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class CommentEventHandler {
    private final UserRepository userRepository;

    @HandleBeforeSave
    @HandleBeforeCreate
    public void handleCommentSave(Comment p) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
        User user = userRepository.findByUsername(userDetails.getUsername());
        p.setUser(user);
    }

}

