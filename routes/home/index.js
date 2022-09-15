//ES 문법 사용 명시
"use strict";

const express = require("express");
const router = express.Router();

// 컨트롤러 선언
const ctrl = require('./home.ctrl');

router.get("/", ctrl.home);
router.get("/login", ctrl.login)

module.exports = router;