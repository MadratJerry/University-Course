package controllers;

import base.BaseServlet;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import models.BorrowRecord;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "ServletCheckRecord", urlPatterns = "/checkRecord")
public class ServletCheckRecord extends BaseServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        JSONObject jsonObject = getJSONObject();
        JSONObject json = new BorrowRecord().checkRecord(jsonObject.getString("borrowId"),
                jsonObject.getString("bookId"));
        if (json != null) {
            response.getWriter().println(JSON.toJSON(json));
        } else {
            response.setStatus(400);
        }
    }
}
