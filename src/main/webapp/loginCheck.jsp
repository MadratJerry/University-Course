<%@ page contentType="text/html;charset=UTF-8" %>
<jsp:useBean id="user" class="models.User" scope="request"/>
<jsp:setProperty name="user" property="*"/>
<%
    if (user.verified()) {
        session.setAttribute("user", user);
    }
    if (session.getAttribute("user") != null) {
        response.sendRedirect("/");
    }
%>
