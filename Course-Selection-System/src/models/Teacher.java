package models;

import base.Model;
import models.methods.ILoginCheck;

import java.util.Date;

public class Teacher extends Model implements ILoginCheck {
    private String teacherId;
    private String teacherName;
    private String teacherGender;
    private Date teacherBirth;
    private String teacherPassword;
    private String teacherPhone;
    private String collegeId;

    @Override
    public boolean loginCheck(String username, String password) {
        Teacher teacher = new Teacher().findOneById(username);
        if (teacher == null) {
            return false;
        } else {
            return teacher.getTeacherPassword().equals(password);
        }
    }

    public String getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(String teacherId) {
        this.teacherId = teacherId;
    }

    public String getTeacherName() {
        return teacherName;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
    }

    public String getTeacherGender() {
        return teacherGender;
    }

    public void setTeacherGender(String teacherGender) {
        this.teacherGender = teacherGender;
    }

    public Date getTeacherBirth() {
        return teacherBirth;
    }

    public void setTeacherBirth(Date teacherBirth) {
        this.teacherBirth = teacherBirth;
    }

    public String getTeacherPassword() {
        return teacherPassword;
    }

    public void setTeacherPassword(String teacherPassword) {
        this.teacherPassword = teacherPassword;
    }

    public String getTeacherPhone() {
        return teacherPhone;
    }

    public void setTeacherPhone(String teacherPhone) {
        this.teacherPhone = teacherPhone;
    }

    public String getCollegeId() {
        return collegeId;
    }

    public void setCollegeId(String collegeId) {
        this.collegeId = collegeId;
    }
}
