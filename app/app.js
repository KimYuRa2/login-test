//ES 문법 사용 명시
"use strict";

//모듈
const express = require('express');
const app = express();

//라우팅(라우팅을 위한 파일 연결)
const home = require("./src/routes/home");

//앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`)); //${__dirname} : 현재 app.js가 있는 위치를 반환(app폴더 안에 있음). app안의 src안의 public 폴더를 정적(static)경로로 추가하겠다.
// 위 설정으로 인해 => views>home>login.ejs에서( <script src="/js/home/login.js"></script>) /js폴더로 접근하게되면, public 안에 있는 js폴더로 접근하게 됨!!


//미들웨어 등록
app.use("/", home); // use -> 미들웨어를 등록해주는 메서드. ("/"라는 경로로 들어오면 home으로 보내줘)


module.exports = app;




