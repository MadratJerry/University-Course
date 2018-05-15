package controllers;

import com.alibaba.fastjson.JSON;
import models.Course;
import utils.ServletJSON;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "ServletCourse", urlPatterns = "/course/*")
public class ServletCourse extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String id = request.getPathInfo().substring(1);
        Course course = ServletJSON.parse(request, Course.class);
        new Course().updateOneById(id, course);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String id = request.getPathInfo().substring(1);
        Course course = new Course().findOneById(id);
        if (course == null) {
            response.setStatus(404);
        } else {
            response.getWriter().println(JSON.toJSON(course));
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String id = request.getPathInfo().substring(1);
        response.setStatus(new Course().deleteOneById(id) ? 200 : 404);
    }
}
