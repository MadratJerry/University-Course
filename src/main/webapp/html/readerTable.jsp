<%@ page import="models.User" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.Map" %>
<%@ page import="models.User" %>
<%@ page import="models.User" %>
<%@ page isELIgnored="false" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String value = request.getParameter("search");
    Map<String, String[]> map = new HashMap<>();
    if (value != null) {
        for (String key : new String[]{"username", "departments", "major", "phone", "email", "realname"}) {
            map.put(key, new String[]{value});
        }
    }
    List<User> userList = new User().findLike(map);
%>
<style>
    .table input {
        border: none;
        font-size: inherit;
        background: none;
        width: 100%;
    }

    .table tfoot {
        background: lightgray;
    }
</style>
<div class="ad_data">
    <div class="search">
        <input id="searchInput"/>
        <div class="btn" onclick="window.location.href = '?tab=0&search=' + document.getElementById('searchInput').value">搜索</div>
    </div>
    <div class="table_div">
        <table class="table">
            <thead>
            <tr>
                <th class="tdOne">借阅号</th>
                <th class="tdOne">用户名</th>
                <th>密码</th>
                <th>学院</th>
                <th>专业</th>
                <th>电话</th>
                <th class="tdOne">邮箱</th>
                <th>借阅上限</th>
                <th>借阅期限</th>
                <th>在借数量</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <%
                for (User u : userList) {
                    pageContext.setAttribute("user", u);
            %>
            <tr id="${user.username}">
                <td><input value="${user.username}" name="username"/></td>
                <td><input value="${user.realname}" name="realname"></td>
                <td><input value="${user.password}" name="password" type="password"></td>
                <td><input value="${user.departments}" name="departments"/></td>
                <td><input value="${user.major}" name="major"/></td>
                <td><input value="${user.phone}" name="phone"/></td>
                <td><input value="${user.email}" name="email"/></td>
                <td><input value="${user.max}" name="max"/></td>
                <td><input value="${user.time}" name="time"/></td>
                <td><input value="${user.count}" name="count"/></td>
                <td>
                    <input type="button" class="save" value="保存" onclick="save('${user.username}')">
                    <input type="button" class="delete" value="删除" onclick="remove('${user.username}')">
                </td>
            </tr>
            <%
                }
            %>
            </tbody>
            <tfoot>
            <tr id="post">
                <td><input name="username"/></td>
                <td><input name="realname"></td>
                <td><input name="password"></td>
                <td><input name="departments"/></td>
                <td><input name="major"/></td>
                <td><input name="phone"/></td>
                <td><input name="email"/></td>
                <td><input name="max"/></td>
                <td><input name="time"/></td>
                <td><input name="count"/></td>
                <td>
                    <input type="button" value="添加" onclick="post()">
                </td>
            </tr>
            </tfoot>
        </table>
    </div>
</div>
<script>
    $(".table tbody tr:odd").css("backgroundColor", "#DFF0D8");

    async function save(id) {
        const jsonArray = $('#' + id + ' :input').serializeArray();
        const json = {};
        for (const i of jsonArray) json[i.name] = i.value;
        const response = await fetch('/user/' + id, {
            method: "put",
            credentials: "same-origin",
            body: JSON.stringify(json)
        });
        if (response.ok) {
            alert("保存成功!")
        }
    }

    async function remove(id) {
        const response = await fetch('/user/' + id, {method: "delete", credentials: "same-origin"});
        if (response.ok) {
            alert("删除成功!")
        }
    }

    async function post() {
        const jsonArray = $(`#post :input`).serializeArray();
        const json = {};
        for (const i of jsonArray) json[i.name] = i.value;
        const response = await fetch('/user', {
            method: "post",
            credentials: "same-origin",
            body: JSON.stringify(json)
        });
        if (response.ok) {
            alert("添加成功!")
        }
    }
</script>