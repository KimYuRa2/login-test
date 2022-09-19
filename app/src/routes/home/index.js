//ES 문법 사용 명시
"use strict";

const express = require("express");
const router = express.Router();

// 컨트롤러 선언
const ctrl = require('./home.ctrl');

router.get("/", ctrl.output.hello);
router.get("/login", ctrl.output.login);

//#12. 로그인 프로세스 처리
router.post("/login", ctrl.process.login);

module.exports = router;