// #3. 컨트롤러 분리
"use strict";

const home = (req, res) => {
    res.render("home/index");
}
/*
위와 같음
function hello(req, res) {
    res.render("home/index");
}
*/

const login = (req,res) => {
    res.render("home/login");
}

/* 오브젝트 원래 형식인 {key: value} 구조인데, value값을 쓰지 않으면 자동으로 key값과 같은 이름으로 value에 넣게됨. */
module.exports = {
    home, /* == { home : home } */
    login
}