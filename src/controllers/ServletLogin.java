package controllers;

import base.BaseServlet;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import models.Administrator;
import models.User;
import models.IUser;
import models.Librarian;
import models.User;
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
        IUser user = null;
        if (role.equals("1")) {
            user = (User) convertJSONObject(jsonObject, User.class);
            response.getWriter().println(JSON.toJSON(new User().findOneByPrimaryKey(jsonObject.getString("username"))));
        } else if (role.equals("2")) {
            user = (Librarian) convertJSONObject(jsonObject, Librarian.class);
            response.getWriter().println(JSON.toJSON(new Librarian().findOneByPrimaryKey(jsonObject.getString("username"))));
        } else if (role.equals("3")) {
            user = (Administrator) convertJSONObject(jsonObject, Administrator.class);
            response.getWriter().println(JSON.toJSON(new Administrator().findOneByPrimaryKey(jsonObject.getString("username"))));
        }
        if (user == null || !user.isVerified()) {
            response.setStatus(403);
            return;
        }
        request.getSession().setAttribute("username", jsonObject.getString("username"));
        request.getSession().setAttribute("role", role);
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        JSONObject jsonObject = getJSONObject();
        String role = jsonObject.getString("role");
        IUser user = null;
        boolean isSuccess = false;
        if (role.equals("1")) {
            user = (User) convertJSONObject(jsonObject, User.class);
            isSuccess = user.changePassword(jsonObject.getString("newPassword"));
        }
        response.setStatus(isSuccess ? 200 : 403);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
