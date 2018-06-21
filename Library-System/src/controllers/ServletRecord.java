package controllers;

import base.BaseServlet;
import models.BorrowRecord;

import javax.servlet.annotation.WebServlet;

@WebServlet(name = "ServletRecord", urlPatterns = {"/record", "/record/*"})
public class ServletRecord extends BaseServlet<BorrowRecord> {
}
