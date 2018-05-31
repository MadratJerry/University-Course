<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<script>
    $(document).ready(function () {
        $(".table tbody tr:odd").css("backgroundColor", "#FCF8E3");//表格奇数行背景
    });
</script>
<div class="ad_data">
    <div class="data data_1"><label>借阅号</label><input type="text"/></div>
    <div class="data"><label>图书编号</label><input type="text"/></div>
    <div class="btn A_btn">验证</div>
    <div class="btn B_btn">清空</div>
    <div class="table_div">
        <table class="table">
            <thead>
            <th>借阅号</th>
            <th>图书名</th>
            <th>应还日期</th>
            </thead>
            <tbody>
            <tr>
                <td>11223344</td>
                <td>小王子</td>
                <td>2015-11-11</td>
            </tr>
            <tr>
                <td>11223344</td>
                <td>小王子</td>
                <td>2015-11-11</td>
            </tr>
            <tr>
                <td>11223344</td>
                <td>小王子</td>
                <td>2015-11-11</td>
            </tr>
            <tr>
                <td>11223344</td>
                <td>小王子</td>
                <td>2015-11-11</td>
            </tr>
            </tbody>
        </table>
        <div class="add_btn">确认借阅</div>
        <div class="clear"></div>
    </div>
</div>
