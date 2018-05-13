package controllers;

import com.alibaba.fastjson.JSON;
import models.Student;
import utils.ServletJSON;

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

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String id = request.getPathInfo().substring(1);
        Student student = ServletJSON.parse(request, Student.class);
        new Student().updateOneById(id, student);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String id = request.getPathInfo().substring(1);
        Student student = new Student().findOneById(id);
        if (student == null) {
            response.setStatus(404);
        } else {
            response.getWriter().println(JSON.toJSON(student));
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String id = request.getPathInfo().substring(1);
        response.setStatus(new Student().deleteOneById(id) ? 200 : 404);
    }
}
