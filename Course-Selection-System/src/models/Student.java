package models;

import base.Model;
import models.methods.ILoginCheck;

import java.util.Date;

public class Student extends Model implements ILoginCheck {
    private String studentId;
    private String studentName;
    private String studentGender;
    private Date studentBirth;
    private String studentPassword;

    @Override
    public boolean loginCheck(String username, String password) {
        Student student = new Student().findOneById(username);
        if (student == null) {
            return false;
        } else {
            return student.getStudentPassword().equals(password);
        }
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getStudentGender() {
        return studentGender;
    }

    public void setStudentGender(String studentGender) {
        this.studentGender = studentGender;
    }

    public Date getStudentBirth() {
        return studentBirth;
    }

    public void setStudentBirth(Date studentBirth) {
        this.studentBirth = studentBirth;
    }

    public String getStudentPassword() {
        return studentPassword;
    }

    public void setStudentPassword(String studentPassword) {
        this.studentPassword = studentPassword;
    }

    public String getMajorId() {
        return majorId;
    }

    public void setMajorId(String majorId) {
        this.majorId = majorId;
    }

    private String majorId;
}
