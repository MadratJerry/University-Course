package models;

import base.Model;

import java.util.List;

public class Teacher extends Model {
    public static TeacherBean findTeacherById(String id) {
        List<TeacherBean> list = query(TeacherBean.class, "SELECT * FROM teacher WHERE  teacherId = ?", id);
        return list.isEmpty() ? null : list.get(0);
    }

    public static boolean loginCheck(String username, String password) {
        TeacherBean teacher = findTeacherById(username);
        if (teacher == null) {
            return false;
        } else {
            return teacher.getTeacherPassword().equals(password);
        }
    }
}
