package models;

import base.Model;

import java.util.List;

public class Teacher extends Model {
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

    public static List<StudentBean> findAll() {
        return query(StudentBean.class, "SELECT teacherId, teacherBirth, teacherGender, teacherName, teacherPhone, collegeId FROM teacher");
    }
}
