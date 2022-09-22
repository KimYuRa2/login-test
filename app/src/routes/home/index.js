//ES 문법 사용 명시
"use strict";

const express = require("express");
const router = express.Router();

// 컨트롤러 선언
const ctrl = require('./home.ctrl');

router.get("/", ctrl.output.hello);
router.get("/login", ctrl.output.login);
router.get("/register", ctrl.output.register);

//#12. 로그인 프로세스 처리
router.post("/login", ctrl.process.login);
//#20. 회원가입 프로세스 처리
router.post("/register", ctrl.process.register);

module.exports = router;