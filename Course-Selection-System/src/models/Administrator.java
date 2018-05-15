package models;

import base.Model;
import models.methods.ILoginCheck;

import java.util.Date;

public class Administrator extends Model implements ILoginCheck {
    private String administratorId;
    private String administratorGender;
    private Date administratorBirth;
    private String administratorPassword;

    @Override
    public boolean loginCheck(String username, String password) {
        Administrator administrator = new Administrator().findOneById(username);
        if (administrator == null) {
            return false;
        } else {
            return administrator.getAdministratorPassword().equals(password);
        }
    }

    public String getAdministratorId() {
        return administratorId;
    }

    public void setAdministratorId(String administratorId) {
        this.administratorId = administratorId;
    }

    public String getAdministratorGender() {
        return administratorGender;
    }

    public void setAdministratorGender(String administratorGender) {
        this.administratorGender = administratorGender;
    }

    public Date getAdministratorBirth() {
        return administratorBirth;
    }

    public void setAdministratorBirth(Date administratorBirth) {
        this.administratorBirth = administratorBirth;
    }

    public String getAdministratorPassword() {
        return administratorPassword;
    }

    public void setAdministratorPassword(String administratorPassword) {
        this.administratorPassword = administratorPassword;
    }
}
