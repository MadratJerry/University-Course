package models;

import base.Model;

public class Major extends Model {
    private String majorId;
    private String collegeId;
    private String majorName;
    private String instructorId;
    private String majorSummary;

    public String getMajorSummary() {
        return majorSummary;
    }

    public void setMajorSummary(String majorSummary) {
        this.majorSummary = majorSummary;
    }

    public String getMajorId() {
        return majorId;
    }

    public void setMajorId(String majorId) {
        this.majorId = majorId;
    }

    public String getCollegeId() {
        return collegeId;
    }

    public void setCollegeId(String collegeId) {
        this.collegeId = collegeId;
    }

    public String getMajorName() {
        return majorName;
    }

    public void setMajorName(String majorName) {
        this.majorName = majorName;
    }

    public String getInstructorId() {
        return instructorId;
    }

    public void setInstructorId(String instructorId) {
        this.instructorId = instructorId;
    }
}
