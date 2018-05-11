package controllers;

import com.alibaba.fastjson.JSON;
import models.Student;
import models.StudentBean;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "ServletStudent", urlPatterns = "/student/*")
public class ServletStudent extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String id = request.getPathInfo().substring(1);
        StudentBean studentBean = Student.findOneById(id);
        if (studentBean == null) {
            response.setStatus(404);
        } else {
            response.getWriter().println(
                    JSON.toJSON(studentBean));
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String id = request.getPathInfo().substring(1);
        response.setStatus(Student.deleteOneById(id) ? 200 : 404);
    }
}
