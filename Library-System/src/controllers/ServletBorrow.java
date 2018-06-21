package controllers;

import base.BaseServlet;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "ServletBorrow", urlPatterns = "/borrow")
public class ServletBorrow extends BaseServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        JSONArray jsonArray = getJSONArray();
        for (Object object : jsonArray) {
            System.out.println(((JSONObject) object).getString("borrowId"));
        }

    }
}
