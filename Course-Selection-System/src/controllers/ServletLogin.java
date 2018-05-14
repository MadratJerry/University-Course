package controllers;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import models.Administrator;
import models.Student;
import models.Teacher;
import utils.ServletJSON;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebServlet(name = "ServletLogin", urlPatterns = "/login")
public class ServletLogin extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        JSONObject jsonObject = ServletJSON.parse(request);
        String username = jsonObject.getString("username");
        String password = jsonObject.getString("password");
        Authority authority = Authority.STUDENT;
        boolean isCorrect = false;
        Object user = null;
        if (username != null && password != null) {
            if (username.length() == 11) {
                Student student = new Student();
                isCorrect = student.loginCheck(username, password);
                authority = Authority.STUDENT;
                user = JSON.toJSONString(student.findOneById(username));
            } else if (username.length() == 8) {
                Teacher teacher = new Teacher();
                isCorrect = teacher.loginCheck(username, password);
                authority = Authority.TEACHER;
                user = JSON.toJSONString(teacher.findOneById(username));
            } else {
                Administrator administrator = new Administrator();
                isCorrect = new Administrator().loginCheck(username, password);
                authority = Authority.ADMIN;
                user = JSON.toJSONString(administrator.findOneById(username));
            }
        }

        if (isCorrect) {
            HttpSession session = request.getSession();
            session.setAttribute("authority", authority);
            session.setAttribute("username", username);
            response.getWriter().println(JSON.toJSON(user));
            response.setStatus(200);
        } else {
            response.setStatus(401);
        }

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    }
}
