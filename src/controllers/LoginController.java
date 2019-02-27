package controllers;

import base.controller.Controller;
import models.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "LoginController",urlPatterns = "/login")
public class LoginController extends Controller {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        User user = convertJSONObject(User.class, getJSONObject());
        if (user.verified()) {
            request.getSession().setAttribute("user", user);
        } else {
            response.setStatus(403);
        }
    }
}
