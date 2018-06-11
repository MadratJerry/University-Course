package controllers;

import base.BaseServlet;
import models.User;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "ServletUser", urlPatterns = {"/user", "/user/*"})
public class ServletUser extends BaseServlet<User> {
}
