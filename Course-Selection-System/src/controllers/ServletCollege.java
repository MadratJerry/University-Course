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

@WebServlet(name = "ServletCollege", urlPatterns = "/college/*")
public class ServletCollege extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String id = request.getPathInfo().substring(1);
        College college = ServletJSON.parse(request, College.class);
        new College().updateOneById(id, college);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String id = request.getPathInfo().substring(1);
        College college = new College().findOneById(id);
        if (college == null) {
            response.setStatus(404);
        } else {
            response.getWriter().println(JSON.toJSON(college));
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String id = request.getPathInfo().substring(1);
        response.setStatus(new College().deleteOneById(id) ? 200 : 404);
    }
}
