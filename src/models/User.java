package models;

import base.Model;
import base.PrimaryKey;

public class User extends Model implements ILoginCheck {
    @PrimaryKey
    private String userId;
    private String username;
    private String password;

    @Override
    public boolean isVerified() {
        return !find(this).isEmpty();
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
