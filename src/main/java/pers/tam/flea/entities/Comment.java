package pers.tam.flea.entities;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.rest.core.config.Projection;

import javax.persistence.*;
import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Comment extends Model {

    @Column(columnDefinition = "TEXT")
    private String content;

    @OneToOne(cascade = CascadeType.ALL)
    private Comment parent;

    @ManyToOne(cascade = CascadeType.ALL)
    private User user;

    @ManyToOne
    private User reply;

    public Comment() {
    }

    public Comment(String content) {
        setContent(content);
    }
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

