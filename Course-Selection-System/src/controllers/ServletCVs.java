package controllers;

import com.alibaba.fastjson.JSON;
import models.CV;
import utils.ServletJSON;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "ServletCVs", urlPatterns = "/cv")
public class ServletCVs extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        CV cv = ServletJSON.parse(request, CV.class);
        if (new CV().insertOne(cv)) {
            doGet(request, response);
        } else {
            response.setStatus(400);
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.getWriter().println(JSON.toJSON(new CV().findAll(request.getParameterMap())));
    }
}
