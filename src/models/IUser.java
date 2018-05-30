package models;

public interface IUser {
    boolean isVerified();

    boolean changePassword(String newPassword);
}
