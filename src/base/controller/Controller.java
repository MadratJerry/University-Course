package base.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONException;
import com.alibaba.fastjson.JSONObject;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "Controller")
public class Controller extends HttpServlet {

    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ServletContext ctx = request.getServletContext();
        ctx.setAttribute("JSONPlain", new String(request.getInputStream().readAllBytes()));
        try {
            ctx.setAttribute("JSONObject", JSON.parseObject((String) ctx.getAttribute("JSONPlain")));
        } catch (JSONException e) {
            ctx.setAttribute("JSONObject", new JSONObject());
        }
        try {
            ctx.setAttribute("JSONArray", JSON.parseArray((String) ctx.getAttribute("JSONPlain")));
        } catch (JSONException e) {
            ctx.setAttribute("JSONArray", new JSONArray());
        }
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=utf-8");
        super.service(request, response);
    }

    protected JSONObject getJSONObject() {
        return (JSONObject) getServletContext().getAttribute("JSONObject");
    }

    protected <T> T convertJSONObject(Class<T> tClass, JSONObject jsonObject) {
        return JSON.parseObject(JSON.toJSONString(jsonObject), tClass);
    }
}
