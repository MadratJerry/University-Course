package models;

import base.Model;

import java.util.List;

public class Student extends Model {
    public static void main(String... args) {
        System.out.println(findStudentById("11503070301").getStudentName());
    }

    public static StudentBean findStudentById(String id) {
        List<StudentBean> list = query(StudentBean.class, "SELECT * FROM student WHERE  studentId = ?", id);
        return list.isEmpty() ? null : list.get(0);
    }

    public static boolean loginCheck(String username, String password) {
        StudentBean student = findStudentById(username);
        if (student == null) {
            return false;
        } else {
            return student.getStudentPassword().equals(password);
        }
    }
}
