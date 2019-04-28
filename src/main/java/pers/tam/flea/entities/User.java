package pers.tam.flea.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@JsonIgnoreProperties(value = {
        "password",
        "enabled",
        "authorities",
        "accountNonExpired",
        "accountNonLocked",
        "credentialsNonExpired"}, allowSetters = true)
public class User extends Model implements UserDetails {

    private String username;

    private String password;

    @OneToOne
    private Image avatar;

    @ManyToMany(cascade = CascadeType.ALL)
    private Collection<Role> roles;

    @ManyToMany
    private Collection<Item> collection;

    @OneToMany(mappedBy = "seller", cascade = CascadeType.ALL)
    private Collection<Item> items;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Collection<Comment> comments;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Collection<ItemOrder> itemOrders;

    @OneToMany(cascade = CascadeType.ALL)
    private Collection<ShippingAddress> shippingAddresses;

    public User() {
    }

    public User(String username, String password, Collection<Role> roles) {
        setUsername(username);
        setPassword(password);
        setRoles(roles);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
