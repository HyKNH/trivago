<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html lang="zh">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>Home</title>
    <link rel="stylesheet" href="../../views/static/common/layui/css/layui.css">
    <link rel="stylesheet" href="../../views/static/admin/css/style.css">
    <script src="../../views/static/common/layui/layui.js"></script>
    <script src="../../views/static/common/jquery-3.3.1.min.js"></script>
    <script src="../../views/static/common/vue.min.js"></script>
    <style>
        .right h2{
            margin: 10px 0;
        }
        .right li{
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
<div id="app">
    <!--顶栏-->
    <header>
        <div style="float:left;"><img src="../../views/static/admin/img/tubiao.png" width="152" height="55" /></div>
        <div style="float: right">
            <i  class="layui-icon  layui-anim layui-anim-rotate layui-anim-loop" style="font-size: 30px; color: #969baa;">&#xe614;</i>&nbsp; &nbsp; &nbsp;
        </div>
    </header>

    <div class="main" id="">
        <!--左栏-->
        <div class="left">
            <ul class="cl" >
                <!--顶级分类-->
                <li v-for="vo,index in menu" :class="{hidden:vo.hidden}">
                    <a href="javascript:;" :class="{active:vo.active}" @click="onActive(index)">
                        <i class="layui-icon" v-html="vo.icon"></i>
                        <span v-text="vo.name"></span>
                        <i class="layui-icon arrow" v-show="vo.url.length==0">&#xe61a;</i> <i v-show="vo.active" class="layui-icon active">&#xe623;</i>
                    </a>
                    <!--子级分类-->
                    <div v-for="vo2,index2 in vo.list">
                        <a href="javascript:;" :class="{active:vo2.active}" @click="onActive(index,index2)" v-text="vo2.name"></a>
                        <i v-show="vo2.active" class="layui-icon active">&#xe623;</i>
                    </div>
                </li>
            </ul>
        </div>
        <!--右侧-->
        <div class="right">
            <blockquote class="layui-elem-quote">
                    <h2>Welcome</h2>

                    <marquee  vspace="15px">
                        <font face="宋体" size="5px" color="fuchsia" >Welcome to our hotel! Have a nice day!</font>
                    </marquee>
                <%-- time--%>
                <div id="datetime">
                    <script>
                        setInterval("document.getElementById('datetime').innerHTML=new Date().toLocaleString();", 1000);
                    </script>
                </div>

            </blockquote>




             <form class="layui-form" method="post" action="${pageContext.request.contextPath}/vip/register" >

                     <div class="layui-form-item">
                         <input type="text" name="Id"  id="Id" placeholder="Id" visibility: hidden">
                         <i class="layui-icon input-icon">&#xe66f;</i>
                     </div>

                    <div class="layui-form-item">
                        <input type="text" name="account"  id="account" placeholder="account" class="layui-input" required>
                        <i class="layui-icon input-icon">&#xe66f;</i>
                    </div>

                    <div class="layui-form-item">
                        <input type="password" name="password" id="password" placeholder="password"  class="layui-input" required>
                        <i class="layui-icon input-icon">&#xe673;</i>
                    </div>

                    <div class="layui-form-item">
                        <input type="password" name="confirmPassword" id="confirmPassword" placeholder="confirmPassword"  class="layui-input" required>
                        <i class="layui-icon input-icon">&#xe673;</i>
                    </div>

                    <div class="layui-form-item">
                        <button style="width: 30%" class="layui-btn layui-btn-radius layui-btn-normal" lay-submit lay-filter="register" >register</button>
                    </div>
                    <br>
                </form>

 <form class="layui-form" method="post" target="_blank" action="${pageContext.request.contextPath}/vip/list" >
                <button class="layui-form" >click to check VIP List</button>
</form>


        </div>
    </div>
</div>
<script src="../../views/static/vip/js/config.js"></script>
<script src="../../views/static/admin/js/script.js"></script>
<script type="text/javascript">

</script>
</body>
</html>
