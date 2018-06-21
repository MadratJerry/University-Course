<%@ page import="models.User" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.Map" %>
<%@ page import="models.Book" %>
<%@ page isELIgnored="false" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String value = request.getParameter("search");
    Map<String, String[]> map = new HashMap<>();
    if (value != null) {
        for (String key : new String[]{"bookId", "bookName", "author", "translator", "publishCompany"}) {
            map.put(key, new String[]{value});
        }
    }
    List<Book> bookList = new Book().findLike(map);
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
                <th class="tdOne">图书编号</th>
                <th class="tdOne">图书名称</th>
                <th>作者</th>
                <th>译者</th>
                <th>价格</th>
                <th>ISBN编码</th>
                <th>出版社</th>
                <th>出版日期</th>
                <th>入库者</th>
                <th>入库日期</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <%
                for (Book u : bookList) {
                    pageContext.setAttribute("book", u);
            %>
            <tr id="${book.bookId}">
                <td><input value="${book.bookId}" name="bookId"/></td>
                <td><input value="${book.bookName}" name="bookName"/></td>
                <td><input value="${book.author}" name="author"></td>
                <td><input value="${book.translator}" name="translator"></td>
                <td><input value="${book.price}" name="price"/></td>
                <td><input value="${book.ISBN}" name="iSBN"/></td>
                <td><input value="${book.publishCompany}" name="publishCompany"/></td>
                <td><input value="${book.publishTime}" name="publishTime"/></td>
                <td><input value="${book.enteringPerson}" name="enteringPerson"/></td>
                <td><input value="${book.enteringDate}" name="enteringDate"/></td>
                <td>
                    <input type="button" class="save" value="保存" onclick="save('${book.bookId}')">
                    <input type="button" class="delete" value="删除" onclick="remove('${book.bookId}')">
                </td>
            </tr>
            <%
                }
            %>
            </tbody>
            <tfoot>
            <tr id="post">
                <td><input  name="bookId" disabled/></td>
                <td><input  name="bookName"/></td>
                <td><input  name="author"></td>
                <td><input  name="translator"></td>
                <td><input  name="price"/></td>
                <td><input  name="iSBN"/></td>
                <td><input  name="publishCompany"/></td>
                <td><input  name="publishTime"/></td>
                <td><input  name="enteringPerson"/></td>
                <td><input  name="enteringDate" disabled/></td>
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
        const response = await fetch('/book/' + id, {
            method: "put",
            credentials: "same-origin",
            body: JSON.stringify(json)
        });
        if (response.ok) {
            alert("保存成功!")
        }
    }

    async function remove(id) {
        const response = await fetch('/book/' + id, {method: "delete", credentials: "same-origin"});
        if (response.ok) {
            alert("删除成功!")
        }
    }

    async function post() {
        const jsonArray = $(`#post :input`).serializeArray();
        const json = {};
        for (const i of jsonArray) json[i.name] = i.value;
        const response = await fetch('/book', {
            method: "post",
            credentials: "same-origin",
            body: JSON.stringify(json)
        });
        if (response.ok) {
            alert("添加成功!")
        }
    }
</script>