<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String tab = request.getParameter("tab");
    if (tab == null) {
        response.sendRedirect("librarian.jsp?tab=0");
        return;
    }
%>
<!DOCTYPE html>
<html>
<head>
    <title>图书管理员-读者借书</title>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    <link rel="stylesheet" type="text/css" href="../font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="../style/adMain.css">
    <link rel="stylesheet" type="text/css" href="../style/adBorrowBook.css">
    <script type="text/javascript" src="../script/jquery-2.1.4.min.js"></script>
    <script type="text/javascript" src="../layer-v2.0/layer/layer.js"></script>
    <script>
        $(document).ready(function () {
            $(".left ul li:eq(<%=tab%>)").css("color", "#FFF");
            $(".left ul li:eq(<%=tab%>)").css("background-color", "#B78DE7");
            $(".left ul").find('li:eq(<%=tab%>)').children(".trig").css('display', 'block');
            $(".table tbody tr:odd").css("backgroundColor", "#DFF0D8");
        });
    </script>
</head>
<body>
<div class="ad_page">
    <div class="header">
        <img src="../images/logo.png">
        <div class="state">
            <div class="ad_name">
                <div class="fa_i"><i class="fa fa-user"></i></div>
                <a href="../html/adPersonal.html">图书管理员 <%=session.getAttribute("username")%>
                </a></div>
            <div class="out"><a href="../html/index.html">退出</a></div>
        </div>
        <div class="clear"></div>
    </div>
    <div class="content">
        <div class="left">
            <ul>
                <a href="?tab=0">
                    <li>图书管理</li>
                </a>
                <a href="?tab=1">
                    <li>借还书
                        <div class="trig"></div>
                    </li>
                </a>
                <a href="?tab=2">
                    <li>管理员中心</li>
                </a>
            </ul>
        </div>
        <div class="right">
            <%
                switch (tab) {
                    case "0":
            %>
            <jsp:include page="bookTable.jsp"/>
            <%
                    break;
                case "1":
            %>
            <jsp:include page="recordTable.jsp"/>
            <%
                    break;
                case "2":
            %>
            <jsp:include page="librarianCenter.jsp"/>
            <%
                        break;
                }
            %>
        </div>
        <div class="clear"></div>
    </div>
</div>
</body>
</html>