package controllers;

import base.BaseServlet;
import com.alibaba.fastjson.JSONObject;
import models.ILoginCheck;
import models.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "ServletLogin", urlPatterns = "/login")
public class ServletLogin extends BaseServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        JSONObject jsonObject = getJSONObject();
        String role = jsonObject.getString("role");
        ILoginCheck loginCheck = null;
        if (role.equals("1"))
            loginCheck = (User) convertJSONObject(jsonObject, User.class);
        if (loginCheck == null || !loginCheck.isVerified()) {
            response.setStatus(403);
            return;
        }
        request.getSession().setAttribute("username", jsonObject.getString("username"));
        request.getSession().setAttribute("role", role);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
