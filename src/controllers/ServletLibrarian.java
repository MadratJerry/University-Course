package controllers;

import base.BaseServlet;
import models.Librarian;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "ServletLibrarian", urlPatterns = {"/librarian", "/librarian/*"})
public class ServletLibrarian extends BaseServlet<Librarian> {
}
