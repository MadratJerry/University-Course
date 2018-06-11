<%@ page import="models.BorrowRecord" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.Map" %>
<%@ page isELIgnored="false" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String value = request.getParameter("search");
    Map<String, String[]> map = new HashMap<>();
    if (value != null) {
        for (String key : new String[]{"borrowId"}) {
            map.put(key, new String[]{value});
        }
    }
    List<BorrowRecord> userList = new BorrowRecord().findLike(map);
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
                <th>ID</th>
                <th>借阅号</th>
                <th>图书编号</th>
                <th>借阅时间</th>
                <th>应还时间</th>
                <th>归还时间</th>
                <th>是否归还</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <%
                for (BorrowRecord u : userList) {
                    pageContext.setAttribute("borrowRecord", u);
            %>
            <tr id="${borrowRecord.recordId}">
                <td><input value="${borrowRecord.recordId}" name="recordId" disabled/></td>
                <td><input value="${borrowRecord.borrowId}" name="borrowId" disabled></td>
                <td><input value="${borrowRecord.bookId}" name="bookId" disabled></td>
                <td><input value="${borrowRecord.borrowTime}" name="borrowTime" disabled/></td>
                <td><input value="${borrowRecord.shouldTime}" name="shouldTime" disabled/></td>
                <td><input value="${borrowRecord.returnTime}" name="returnTime" disabled/></td>
                <td><input value="${borrowRecord.state}" name="state" type="hidden"/>
                    ${borrowRecord.state ? "YES": "NO"}
                </td>
                <td>
                    <input type="button" class="save" value="保存" onclick="save('${borrowRecord.recordId}')">
                    <input type="button" class="delete" value="还书" onclick="returnBook('${borrowRecord.recordId}')">
                </td>
            </tr>
            <%
                }
            %>
            </tbody>
            <tfoot>
            <tr id="post">
                <td><input name="recordId" disabled/></td>
                <td><input name="borrowId"></td>
                <td><input name="bookId"></td>
                <td><input name="borrowTime" disabled/></td>
                <td><input name="shouldTime" disabled/></td>
                <td><input name="returnTime" disabled/></td>
                <td><input name="state" disabled/></td>
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
        const response = await fetch('/record/' + id, {
            method: "put",
            credentials: "same-origin",
            body: JSON.stringify(json)
        });
        if (response.ok) {
            alert("保存成功!")
        }
    }

    async function returnBook(id) {
        const response = await fetch('/record/' + id, {method: "delete", credentials: "same-origin"});
        if (response.ok) {
            alert("删除成功!")
        }
    }

    async function post() {
        const jsonArray = $(`#post :input`).serializeArray();
        const json = {};
        for (const i of jsonArray) json[i.name] = i.value;
        const response = await fetch('/record', {
            method: "post",
            credentials: "same-origin",
            body: JSON.stringify(json)
        });
        if (response.ok) {
            alert("添加成功!")
        }
    }
</script>