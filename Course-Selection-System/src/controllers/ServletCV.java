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

@WebServlet(name = "ServletCV", urlPatterns = "/cv/*")
public class ServletCV extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String id = request.getPathInfo().substring(1);
        CV cv = ServletJSON.parse(request, CV.class);
        if (!new CV().updateOneById(id, cv)) {
            throw new IOException("Update error");
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String id = request.getPathInfo().substring(1);
        CV cv = new CV().findOneById(id);
        if (cv == null) {
            response.setStatus(404);
        } else {
            response.getWriter().println(JSON.toJSON(cv));
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String id = request.getPathInfo().substring(1);
        response.setStatus(new CV().deleteOneById(id) ? 200 : 404);
    }
}
