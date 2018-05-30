package controllers;

import base.BaseServlet;
import models.Book;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "ServletBook", urlPatterns = {"/book", "/book/*"})
public class ServletBook extends BaseServlet<Book> {
}
