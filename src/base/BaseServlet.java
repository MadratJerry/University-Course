package base;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.ParameterizedType;
import java.nio.charset.StandardCharsets;

@WebServlet(name = "BaseServlet")
public class BaseServlet<T> extends HttpServlet {
    private T instance;
    private Class<T> tClass;

    @Override
    public void init() throws ServletException {
        super.init();
        if (this.getClass().getGenericSuperclass() != this.getClass().getSuperclass()) {
            @SuppressWarnings("unchecked")
            Class<T> tClass = (Class<T>) ((ParameterizedType) this.getClass().getGenericSuperclass()).getActualTypeArguments()[0];
            this.tClass = tClass;
        } else {
            tClass = null;
        }
        if (getGenericClass() != null) {
            try {
                instance = tClass.getConstructor().newInstance();
            } catch (InstantiationException | IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
                e.printStackTrace();
            }
        }
    }

    protected T getInstance() {
        return instance;
    }

    private Class<T> getGenericClass() {
        return this.getClass().getSuperclass() == this.getClass().getGenericSuperclass() ? null : tClass;
    }

    protected JSONObject getJSONObject() {
        return (JSONObject) getServletContext().getAttribute("JSONObject");
    }

    protected <E> E convertJSONObject(JSONObject jsonObject, Class<E> tClass) {
        return JSON.parseObject(JSON.toJSONString(jsonObject), tClass);
    }

    protected T getJSON() {
        @SuppressWarnings("unchecked")
        T json = (T) getServletContext().getAttribute("JSON");
        return json;
    }

    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ServletContext ctx = request.getServletContext();
        ctx.setAttribute("JSONObject", JSON.parseObject(request.getInputStream(), StandardCharsets.UTF_8, JSONObject.class));
        if (getGenericClass() != null) {
            JSONObject jsonObject = (JSONObject) ctx.getAttribute("JSONObject");
            ctx.setAttribute("JSON", convertJSONObject(jsonObject, getGenericClass()));
        }
        super.service(request, response);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("post");
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("get");
    }
}
