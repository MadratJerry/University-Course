package models;

import base.Model;
import base.PrimaryKey;

public class Librarian extends Model implements IUser {
    @PrimaryKey
    private String username;
    private String password;
    private String phone;
    private String email;

    @Override
    public boolean isVerified() {
        return !find(this).isEmpty();
    }

    @Override
    public boolean changePassword(String newPassword) {
        if (isVerified()) {
            password = newPassword;
            updateOneByPrimaryKey(this, username);
            return true;
        } else {
            return false;
        }
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

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
