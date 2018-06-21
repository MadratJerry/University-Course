<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String tab = request.getParameter("tab");
    if (tab == null) {
        response.sendRedirect("admin.jsp?tab=0");
        return;
    }
%>
<!DOCTYPE html>
<html>
<head>
    <title>系统管理员</title>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    <link rel="stylesheet" type="text/css" href="../font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="../style/adminMain.css">
    <link rel="stylesheet" type="text/css" href="../style/adminAddReader.css">
    <link rel="stylesheet" type="text/css" href="../style/adminReader.css">
    <link rel="stylesheet" type="text/css" href="../style/searchTable.css">
    <script type="text/javascript" src="../script/jquery-2.1.4.min.js"></script>
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
                <a href="../html/adminPersonal.html">管理员 <%=session.getAttribute("username")%></a></div>
            <div class="out"><a href="../html/index.html">退出</a></div>
        </div>
        <div class="clear"></div>
    </div>
    <div class="content">
        <div class="left">
            <%--<ul>--%>
            <%--<a href="../html/adminAddReader.html">--%>
            <%--<li>录入新读者--%>
            <%--<div class="trig"></div>--%>
            <%--</li>--%>
            <%--</a>--%>
            <%--<a href="../html/adminOutReader.html">--%>
            <%--<li>删除读者--%>
            <%--<div class="trig"></div>--%>
            <%--</li>--%>
            <%--</a>--%>
            <%--<a href="../html/adminAlterReader.html">--%>
            <%--<li>修改读者信息--%>
            <%--<div class="trig"></div>--%>
            <%--</li>--%>
            <%--</a>--%>
            <%--<a href="../html/adminAddAd.html">--%>
            <%--<li>录入图书管理员--%>
            <%--<div class="trig"></div>--%>
            <%--</li>--%>
            <%--</a>--%>
            <%--<a href="../html/adminOutAd.html">--%>
            <%--<li>删除图书管理员--%>
            <%--<div class="trig"></div>--%>
            <%--</li>--%>
            <%--</a>--%>
            <%--<a href="../html/adminAlterAd.html">--%>
            <%--<li>修改管理员信息--%>
            <%--<div class="trig"></div>--%>
            <%--</li>--%>
            <%--</a>--%>
            <%--<a href="../html/adminSearchReader.html">--%>
            <%--<li>查看读者信息--%>
            <%--<div class="trig"></div>--%>
            <%--</li>--%>
            <%--</a>--%>
            <%--<a href="../html/adminSearchAd.html">--%>
            <%--<li>查看管理员信息--%>
            <%--<div class="trig"></div>--%>
            <%--</li>--%>
            <%--</a>--%>
            <%--<a href="../html/adminPersonal.html">--%>
            <%--<li>管理员中心--%>
            <%--<div class="trig"></div>--%>
            <%--</li>--%>
            <%--</a>--%>
            <%--</ul>--%>
            <ul>
                <a href="?tab=0">
                    <li>读者管理</li>
                </a>
                <a href="?tab=1">
                    <li>图书管理员管理</li>
                </a>
            </ul>
        </div>
        <div class="right">
            <%
                switch (tab) {
                    case "0":
            %>
            <jsp:include page="readerTable.jsp"/>
            <%
                    break;
                case "1":
            %>
            <jsp:include page="librarianTable.jsp"/>
            <%
                        break;
                }
            %>
        </div>
</body>
</html>
