//ES 문법 사용 명시
"use strict";

//모듈
const express = require('express');
const bodyParser= require('body-parser');
const dotenv = require("dotenv"); // 환경변수 관리 ( "dotenv"사용 : 어떤 os에서 개발하더라도 , 동일하게 환경변수를 등록하고 가져올 수 있게됨.)
const morgan = require("morgan");


const app = express();
dotenv.config(); // config라는 메서드를 실행하면, dotenv라는 모듈이 자동적으로 .env에 등록돼있는 변수들을 node.js에서 접근할 수 있도록  "process.env.환경변수"에 등록을 시켜줌!!

//라우팅(라우팅을 위한 파일 연결)
const home = require("./src/routes/home");

//#28. 로그 관리 | morgan (1/4) => src>config>log.js로 이동하여, 모듈로 분리
const accessLogStream = require("./src/config/log");

//앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`)); //${__dirname} : 현재 app.js가 있는 위치를 반환(app폴더 안에 있음). app안의 src안의 public 폴더를 정적(static)경로로 추가하겠다.
// 위 설정으로 인해 => views>home>login.ejs에서( <script src="/js/home/login.js"></script>) /js폴더로 접근하게되면, public 안에 있는 js폴더로 접근하게 됨!!

app.use(bodyParser.json()); //bodyparser 미들웨어 등록 (bodyparser가 json데이터를 parsing해올 수 있도록 명시 )
app.use(bodyParser.urlencoded({ extended : true })); // url을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결

//#28. 로그 관리 | morgan (1/4)
app.use(morgan("dev")); // 개발환경용 로그출력
app.use(morgan("common", {stream : accessLogStream }));  // npm - morgan 참고

//미들웨어 등록
app.use("/", home); // use -> 미들웨어를 등록해주는 메서드. ("/"라는 경로로 들어오면 home으로 보내줘)


module.exports = app;




