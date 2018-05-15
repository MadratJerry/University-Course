package controllers;

import com.alibaba.fastjson.JSON;
import models.College;
import utils.ServletJSON;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "ServletColleges", urlPatterns = "/college")
public class ServletColleges extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        College college = ServletJSON.parse(request, College.class);
        if (new College().insertOne(college)) {
            doGet(request, response);
        } else {
            response.setStatus(400);
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.getWriter().println(JSON.toJSON(new College().findAll()));
    }
}
