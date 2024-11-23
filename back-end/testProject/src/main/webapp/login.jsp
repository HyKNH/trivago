<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html lang="zh">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>Backend System Login</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/common/layui/css/layui.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/static/admin/css/login.css">
    <script src="${pageContext.request.contextPath}/static/common/layui/layui.js"></script>
</head>

<body id="login">

<div class="login">
    <h2> <strong><font face="Arial" >Hotel System Login</font></strong></h2>

    <form class="layui-form" method="post" target="_blank" action="${pageContext.request.contextPath}/vip/login" >

        <div class="layui-form-item">
            <input type="text" name="username"  id="username" placeholder="Username" class="layui-input" required>
            <i class="layui-icon input-icon">&#xe66f;</i>
        </div>

        <div class="layui-form-item">
            <input type="password" name="password" id="password" placeholder="Password"  class="layui-input" required>
            <i class="layui-icon input-icon">&#xe673;</i>
        </div>

        <div class="layui-form-item">
            <button style="width: 100%" class="layui-btn layui-btn-radius layui-btn-normal" lay-submit lay-filter="login" >Login</button>
        </div>

        <br>
        <div>
            <p style="font-family: Arial; color: #6f6e6e">PS: If you forget your password, please contact the administrator </br>to correct it as soon as possible.</p>
        </div>
    </form>

</div>

</body>

</html>
