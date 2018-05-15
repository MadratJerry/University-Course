package controllers;

import com.alibaba.fastjson.JSON;
import models.Major;
import utils.ServletJSON;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "ServletMajors", urlPatterns = "/major")
public class ServletMajors extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Major major = ServletJSON.parse(request, Major.class);
        if (new Major().insertOne(major)) {
            doGet(request, response);
        } else {
            response.setStatus(400);
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.getWriter().println(JSON.toJSON(new Major().findAll()));
    }
}
