package controllers;

import com.alibaba.fastjson.JSON;
import models.Major;
import models.Major;
import utils.ServletJSON;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "ServletMajor", urlPatterns = "/major/*")
public class ServletMajor extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String id = request.getPathInfo().substring(1);
        Major major = ServletJSON.parse(request, Major.class);
        new Major().updateOneById(id, major);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String id = request.getPathInfo().substring(1);
        Major major = new Major().findOneById(id);
        if (major == null) {
            response.setStatus(404);
        } else {
            response.getWriter().println(JSON.toJSON(major));
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String id = request.getPathInfo().substring(1);
        response.setStatus(new Major().deleteOneById(id) ? 200 : 404);
    }
}
