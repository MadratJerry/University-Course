package models;

import base.OldModel;

public class Major extends OldModel {
    public static MajorBean findMajorById(String id) {
        return findOneById(MajorBean.class, id);
    }
}
