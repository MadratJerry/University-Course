package models;

import base.Bean;

import java.util.Date;

public class StudentBean extends Bean {
    private String studentId;
    private String studentName;
    private String studentGender;
    private Date studentBirth;
    private String studentPassword;
    private String majorId;

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
}
