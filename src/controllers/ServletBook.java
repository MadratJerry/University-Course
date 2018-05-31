package controllers;

import base.BaseServlet;
import com.alibaba.fastjson.JSON;
import models.Book;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "ServletBook", urlPatterns = {"/book", "/book/*"})
public class ServletBook extends BaseServlet<Book> {
}
