package models;

import base.Model;

import java.util.Date;

public class Course extends Model {
    private String courseId;
    private String courseName;
    private Integer courseHour;
    private Double courseCredit;
    private String courseSummary;
    private String teacherId;
    private Date courseBeginTime;

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public Integer getCourseHour() {
        return courseHour;
    }

    public void setCourseHour(Integer courseHour) {
        this.courseHour = courseHour;
    }

    public Double getCourseCredit() {
        return courseCredit;
    }

    public void setCourseCredit(Double courseCredit) {
        this.courseCredit = courseCredit;
    }

    public String getCourseSummary() {
        return courseSummary;
    }

    public void setCourseSummary(String courseSummary) {
        this.courseSummary = courseSummary;
    }

    public String getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(String teacherId) {
        this.teacherId = teacherId;
    }

    public Date getCourseBeginTime() {
        return courseBeginTime;
    }

    public void setCourseBeginTime(Date courseBeginTime) {
        this.courseBeginTime = courseBeginTime;
    }
}
