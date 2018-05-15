package models;

import base.Model;

public class CV extends Model {
    private String cvId;
    private String studentId;
    private String courseId;
    private Double cvScore;

    public String getCvId() {
        return cvId;
    }

    public void setCvId(String cvId) {
        this.cvId = cvId;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public Double getCvScore() {
        return cvScore;
    }

    public void setCvScore(Double cvScore) {
        this.cvScore = cvScore;
    }
}
