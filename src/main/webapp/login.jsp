<%@ page contentType="text/html;charset=UTF-8" %>
<jsp:useBean id="user" class="models.User" scope="request"/>
<jsp:setProperty name="user" property="*"/>
<%
    String username = user.getUsername();
    String password = user.getPassword();
    if ("test".equals(username) && "test".equals(password)) {
        session.setAttribute("username", username);
    }
    if (session.getAttribute("username") != null) {
        response.sendRedirect("/");
    }
%>
<html>
<head>
    <title>Title</title>
</head>
<body>
<form method="post">
    <label>用户名：</label>
    <input type="text" name="username">
    <label>密码：</label>
    <input type="text" name="password">
    <input type="submit">
</form>
</body>
</html>
