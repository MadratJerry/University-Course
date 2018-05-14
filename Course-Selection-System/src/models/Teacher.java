package models;

import base.OldModel;

public class Teacher extends OldModel {
    public static TeacherBean findOneById(String id) {
        return findOneById(TeacherBean.class, id);
    }

    public static boolean loginCheck(String username, String password) {
        TeacherBean teacher = findOneById(username);
        if (teacher == null) {
            return false;
        } else {
            return teacher.getTeacherPassword().equals(password);
        }
    }

}
