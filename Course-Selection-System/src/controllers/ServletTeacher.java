package controllers;

import com.alibaba.fastjson.JSON;
import models.Teacher;
import models.TeacherBean;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "ServletTeacher", urlPatterns = "/teacher/*")
public class ServletTeacher extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String path = request.getPathInfo();
        String id = "";
        if (path != null) id = path.substring(1);
        if (id.equals("")) {
            response.getWriter().println(
                    JSON.toJSON(Teacher.findAll()));
        } else {
            TeacherBean teacherBean = Teacher.findOneById(id);
            if (teacherBean == null) {
                response.setStatus(404);
            } else {
                response.getWriter().println(
                        JSON.toJSON(teacherBean));
            }
        }
    }
}
