//ES 문법 사용 명시
"use strict";

//모듈
const express = require('express');
const app = express();

const PORT = 3000;

//라우팅(라우팅을 위한 파일 연결)
const home = require("./routes/home");

//앱 세팅
app.set("views", "./views");
app.set("view engine", "ejs");

//미들웨어 등록
app.use("/", home); // use -> 미들웨어를 등록해주는 메서드. ("/"라는 경로로 들어오면 home으로 보내줘)





app.listen( PORT, function(){
    console.log(  '서버 가동 in ..  http://localhost:3000/');
});