package models;

import base.OldModel;

import java.util.List;

public class OldStudent extends OldModel {

    public static StudentBean findOneById(String id) {
        return findOneById(StudentBean.class, id);
    }

    public static boolean loginCheck(String username, String password) {
        StudentBean student = findOneById(username);
        if (student == null) {
            return false;
        } else {
            return student.getStudentPassword().equals(password);
        }
    }

    public static List<StudentBean> findAll() {
        return query(StudentBean.class, "SELECT studentId, studentBirth, studentName,studentGender FROM student");
    }

    public static boolean deleteOneById(String id) {
        return deleteOneById(StudentBean.class, id);
    }

    public static boolean insertOne(StudentBean bean) {
        return insertOne(StudentBean.class, bean);
    }
}
