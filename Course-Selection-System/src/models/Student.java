package models;

import base.Model;

import java.util.List;

public class Student extends Model {
    public static void main(String... args) {
        System.out.println(findOneById("11503070301").getStudentName());
    }

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
}
