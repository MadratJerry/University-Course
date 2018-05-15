package utils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class ServletJSON {
    public static JSONObject parse(HttpServletRequest request) throws IOException {
        return parse(request, JSONObject.class);
    }

    public static <T> T parse(HttpServletRequest request, Class<T> classObject) throws IOException {
        return JSON.parseObject(request.getInputStream(), StandardCharsets.UTF_8, classObject);
    }
}
