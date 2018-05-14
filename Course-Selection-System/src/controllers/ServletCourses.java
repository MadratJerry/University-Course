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

@WebServlet(name = "ServletCourses", urlPatterns = "/course")
public class ServletCourses extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Course course = ServletJSON.parse(request, Course.class);
        if (new Course().insertOne(course)) {
            doGet(request, response);
        } else {
            response.setStatus(400);
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.getWriter().println(JSON.toJSON(new Course().findAll()));
    }
}
