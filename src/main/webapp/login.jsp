<%@ page contentType="text/html;charset=UTF-8" %>
<%
    if (session.getAttribute("user") != null) {
        response.sendRedirect("/");
    }
%>
<html>
<head>
    <title>登录</title>
</head>
<body>
<form action="loginCheck.jsp" method="post">
    <label>用户名：</label>
    <input type="text" name="username">
    <label>密码：</label>
    <input type="text" name="password">
    <input type="submit">
</form>
</body>
</html>
