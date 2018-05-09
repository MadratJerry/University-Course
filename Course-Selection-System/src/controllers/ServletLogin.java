package controllers;

import com.alibaba.fastjson.JSONObject;
import models.Student;
import utils.ServletJSON;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "ServletLogin", urlPatterns = "/login")
public class ServletLogin extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        JSONObject jsonObject = ServletJSON.getJSON(request);
        String username = jsonObject.getString("username");
        String password = jsonObject.getString("password");
        boolean isCorrect = false;
        if (username != null && password != null) {
            if (username.length() == 11) {
                isCorrect = Student.loginCheck(username, password);
            }
        }

        if (isCorrect) {
            response.setStatus(200);
        } else {
            response.setStatus(401);
        }

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
