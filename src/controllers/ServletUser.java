package controllers;

import base.BaseServlet;
import models.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "ServletUser", urlPatterns = {"/user", "/user/*"})
public class ServletUser extends BaseServlet<User> {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String pathInfo = request.getPathInfo();
        if (pathInfo != null && pathInfo.substring(1).equals("")) {
            request.getRequestDispatcher("/user/" +
                    request.getSession().getAttribute("username")).forward(request, response);
        } else {
            super.doGet(request, response);
        }
    }
}
