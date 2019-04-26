package pers.tam.flea.entities;

import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.data.rest.core.config.Projection;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import pers.tam.flea.repositories.UserRepository;

import javax.persistence.*;
import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@NoArgsConstructor
@RequiredArgsConstructor
public class Comment extends Model {

    @NonNull
    @Column(columnDefinition = "TEXT")
    private String content;

    @OneToOne(cascade = CascadeType.ALL)
    private Comment parent;

    @ManyToOne(cascade = CascadeType.ALL)
    private User user;

    @ManyToOne
    private User reply;
}

@Projection(name = "detail", types = {Comment.class})
interface CommentDetailProjection {

    Long getId();

    String getContent();

    Comment getParent();

    User getUser();

    User getReply();

    Date getCreatedDate();
}


@Component
@RepositoryEventHandler
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
class CommentEventHandler {
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

