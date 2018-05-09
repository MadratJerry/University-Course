package utils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class ServletJSON {
    public static JSONObject getJSON(HttpServletRequest request) throws IOException {
        return JSON.parseObject(request.getInputStream(), StandardCharsets.UTF_8, JSONObject.class);
    }
}
