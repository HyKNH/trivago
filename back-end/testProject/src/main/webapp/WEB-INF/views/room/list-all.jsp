<%@ page import="com.hotel.pojo.Room" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
  <div id="container">
    <table style="width: 50%">
      <tr>
        <th>location</th>
        <th>roomType</th>
      </tr>

      <c:forEach var="room" items="${rooms}">
        <tr>
          <td>${room.location}</td>
          <td>${room.room_type}</td>
        </tr>
      </c:forEach>
    </table>
  </div>
</body>
<style>
  #container {
    width: 100%;
    height: 50%;
    display: flex;
  }
</style>
</html>
