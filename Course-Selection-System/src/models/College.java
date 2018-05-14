package models;

import base.Model;

public class College extends Model {
    private String collegeId;
    private String collegeName;
    private String collegeHeadId;
    private String collegeSummary;

    public String getCollegeId() {
        return collegeId;
    }

    public void setCollegeId(String collegeId) {
        this.collegeId = collegeId;
    }

    public String getCollegeName() {
        return collegeName;
    }

    public void setCollegeName(String collegeName) {
        this.collegeName = collegeName;
    }

    public String getCollegeHeadId() {
        return collegeHeadId;
    }

    public void setCollegeHeadId(String collegeHeadId) {
        this.collegeHeadId = collegeHeadId;
    }

    public String getCollegeSummary() {
        return collegeSummary;
    }

    public void setCollegeSummary(String collegeSummary) {
        this.collegeSummary = collegeSummary;
    }
}
