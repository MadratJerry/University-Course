package models;

import base.Model;

import java.util.List;

public class Major extends Model {
    public static MajorBean findMajorById(String id) {
        return findOneById(MajorBean.class, id);
    }
}
