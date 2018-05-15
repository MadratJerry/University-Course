package controllers;

import com.alibaba.fastjson.JSON;
import models.Teacher;
import utils.ServletJSON;

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

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String id = request.getPathInfo().substring(1);
        Teacher teacher = ServletJSON.parse(request, Teacher.class);
        new Teacher().updateOneById(id, teacher);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String id = request.getPathInfo().substring(1);
        Teacher teacher = new Teacher().findOneById(id);
        if (teacher == null) {
            response.setStatus(404);
        } else {
            response.getWriter().println(JSON.toJSON(teacher));
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String id = request.getPathInfo().substring(1);
        response.setStatus(new Teacher().deleteOneById(id) ? 200 : 404);
    }
}
