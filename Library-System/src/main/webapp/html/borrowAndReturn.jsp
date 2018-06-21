<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<script>
    $(document).ready(function () {
        $(".table tbody tr:odd").css("backgroundColor", "#FCF8E3");//表格奇数行背景
    });
</script>
<div class="ad_data">
    <div class="data data_1"><label>借阅号</label><input id="borrowId" type="text"/></div>
    <div class="data"><label>图书编号</label><input id="bookId" type="text"/></div>
    <div class="btn A_btn" onclick="checkRecord()">验证</div>
    <div class="btn B_btn">清空</div>
    <div class="table_div">
        <table class="table">
            <thead>
            <th>借阅号</th>
            <th>图书名</th>
            <th>应还日期</th>
            </thead>
            <tbody id="borrow">
            </tbody>
        </table>
        <div class="add_btn" onclick="borrow()">确认借阅</div>
        <div class="clear"></div>
    </div>
</div>

<script>
    const borrowArray = [];

    async function checkRecord() {
        const borrowId = document.getElementById("borrowId").value;
        const bookId = document.getElementById("bookId").value;
        const response = await fetch('/checkRecord', {method: "post", body: JSON.stringify({borrowId, bookId})});
        if (response.ok) {
            alert("可借阅！");
            borrowArray.push(await response.json());
            render();
        } else {
            alert("不可借阅！");
        }
    }

    function render() {
        const table = document.getElementById("borrow");
        table.innerHTML = borrowArray.map(e => '<tr> <td>' + e.borrowId + '</td> <td>' + e.bookName + '</td> <td>' + new Date(e.endTime).toLocaleDateString() + '</td> </tr>').join('')
    }

    async function borrow() {
        await fetch('/borrow', {method: "post", body: JSON.stringify(borrowArray)});
    }

</script>