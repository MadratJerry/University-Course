package base;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONException;
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
public class BaseServlet<T extends Model> extends HttpServlet {
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
        try {
            ctx.setAttribute("JSONObject", JSON.parseObject(request.getInputStream(), StandardCharsets.UTF_8, JSONObject.class));
        } catch (JSONException e) {
            ctx.setAttribute("JSONObject", new JSONObject());
        }
        if (getGenericClass() != null) {
            JSONObject jsonObject = (JSONObject) ctx.getAttribute("JSONObject");
            ctx.setAttribute("JSON", convertJSONObject(jsonObject, getGenericClass()));
        }
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=utf-8");
        super.service(request, response);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if (request.getPathInfo() != null) {
            response.setStatus(405);
        } else {
            T t = getJSON();
            if (!getInstance().insertOne(t)) {
                response.setStatus(400);
            }
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String pathInfo = request.getPathInfo();
        if (pathInfo == null) {
            response.getWriter().println(JSON.toJSON(getInstance().findLike(request.getParameterMap())));
        } else {
            T t = getInstance().findOneByPrimaryKey(request.getPathInfo().substring(1));
            if (t == null) {
                response.setStatus(404);
            } else {
                response.getWriter().println(JSON.toJSON(t));
            }
        }
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String pathInfo = request.getPathInfo();
        if (pathInfo != null) {
            T t = getJSON();
            getInstance().updateOneByPrimaryKey(t, pathInfo.substring(1));
        } else {
            response.setStatus(405);
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String pathInfo = request.getPathInfo();
        if (pathInfo != null) {
            getInstance().deleteOneByPrimaryKey(pathInfo.substring(1));
        } else {
            response.setStatus(405);
        }
    }
}
