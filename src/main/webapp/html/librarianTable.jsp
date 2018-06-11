<%@ page import="models.Librarian" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.Map" %>
<%@ page isELIgnored="false" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String value = request.getParameter("search");
    Map<String, String[]> map = new HashMap<>();
    if (value != null) {
        for (String key : new String[]{"username", "phone", "email"}) {
            map.put(key, new String[]{value});
        }
    }
    List<Librarian> librarianList = new Librarian().findLike(map);
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
        <div class="btn"
             onclick="window.location.href = '?tab=1&search=' + document.getElementById('searchInput').value">搜索
        </div>
    </div>
    <div class="table_div">
        <table class="table">
            <thead>
            <tr>
                <th>用户名</th>
                <th>密码</th>
                <th>电话</th>
                <th>邮箱</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <%
                for (Librarian u : librarianList) {
                    pageContext.setAttribute("librarian", u);
            %>
            <tr id="${librarian.username}">
                <td><input value="${librarian.username}" name="username"/></td>
                <td><input value="${librarian.password}" name="password" type="password"></td>
                <td><input value="${librarian.phone}" name="phone"/></td>
                <td><input value="${librarian.email}" name="email"/></td>
                <td>
                    <input type="button" class="save" value="保存" onclick="save('${librarian.username}')">
                    <input type="button" class="delete" value="删除" onclick="remove('${librarian.username}')">
                </td>
            </tr>
            <%
                }
            %>
            </tbody>
            <tfoot>
            <tr id="post">
                <td><input name="username"/></td>
                <td><input name="password"></td>
                <td><input name="phone"/></td>
                <td><input name="email"/></td>
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
        const response = await fetch('/librarian/' + id, {
            method: "put",
            credentials: "same-origin",
            body: JSON.stringify(json)
        });
        if (response.ok) {
            alert("保存成功!")
        }
    }

    async function remove(id) {
        const response = await fetch('/librarian/' + id, {method: "delete", credentials: "same-origin"});
        if (response.ok) {
            alert("删除成功!")
        }
    }

    async function post() {
        const jsonArray = $(`#post :input`).serializeArray();
        const json = {};
        for (const i of jsonArray) json[i.name] = i.value;
        const response = await fetch('/librarian', {
            method: "post",
            credentials: "same-origin",
            body: JSON.stringify(json)
        });
        if (response.ok) {
            alert("添加成功!")
        }
    }
</script>