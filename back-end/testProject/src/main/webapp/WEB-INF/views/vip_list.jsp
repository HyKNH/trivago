<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html lang="zh">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>VIP List</title>
    <link rel="stylesheet" href="../views/static/common/layui/css/layui.css">
    <link rel="stylesheet" href="../views/static/admin/css/style.css">
    <script src="../views/static/common/layui/layui.js"></script>
    <script src="../views/static/common/jquery-3.3.1.min.js"></script>
    <script src="../views/static/common/vue.min.js"></script>
</head>
<body>
<div id="app">

    <header>
        <div style="float:left;"><img src="../views/static/admin/img/tubiao.png" width="152" height="55" /></div>
        <div style="float: right">
            <i  class="layui-icon  layui-anim layui-anim-rotate layui-anim-loop" style="font-size: 30px; color: #969baa;">&#xe614;</i>&nbsp; &nbsp; &nbsp;
        </div>
    </header>

    <div class="main" id="app">

        <div class="right">

            <%--            form --%>
            <table class="layui-table layui-form">

                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Sex</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Level</th>
                    <th>StartTime</th>
                    <th>EndTime</th>
                    <th>Operation</th>
                </tr>
                </thead>

                <tbody>
                <c:forEach items="${list}" var="v">
                    <tr class="id36567">
                        <td>${v.id}</td>
                        <td>${v.name}</td>
                        <td>${v.sex}</td>
                        <td>${v.email}</td>
                        <td>${v.phone}</td>
                        <td>${v.v_Type}</td>
                        <td>${v.startTime}</td>
                        <td>${v.endTime}</td>
                        <td>
                            <a href="javascript: if(window.confirm('Confirm deletion？'))
                {window.location.href='${pageContext.request.contextPath}/vip/delete?id=${v.id}'}"  >Delete</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                            <a href="${pageContext.request.contextPath}/vip/update1?id=${v.id}" > Modify</a></td>
                        </td>
                    </tr>
                </c:forEach>
                </tbody>
            </table>

        </div>
    </div>
</div>

<script src="../views/static/admin/js/config.js"></script>
<script src="../views/static/admin/js/script.js"></script>
</body>
</html>
