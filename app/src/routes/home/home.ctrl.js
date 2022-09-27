// #3. 컨트롤러 분리
"use strict";

//#15. 
// const UserStorage = require("../../models/UserStorage");
//#16.
const User = require("../../models/User");


//#13. 일단 컨트롤러 자체에서 해당 데이터 만들어놓기
// const users = {
//     id : ["test1", "test2", "test3"],
//     psword : ["1234", "12345", "123456"],
// }

// const hello = (req, res) => {
//     res.render("home/index");
// }

// => 위와 같음
// function hello(req, res) {
//     res.render("home/index");
// }

// const login = (req,res) => {
//     res.render("home/login");
// }




//#12. 렌더링하는 역할의 hello, login 함수를 output객체로 빼줌
const output = {
    hello : (req, res) => {
        res.render("home/index");
    },
    
    login : (req,res) => {
        res.render("home/login");
    },

    register : (req,res) => {
        res.render("home/register");
    }
};

//#12. #13. 
const process = {
    login : async (req, res) => {
        // #16. (models > User.js와 같이 보기)
        const user = new User(req.body);
        const response = await user.login(); //login을 실행하는 애한테도 async-await을 걸어줘야함! async await 함수는 자체적으로 Promise를 반환하도록 돼있음. 따라서 await을 적용해줄 수 있는 것.
        console.log(response);
        return res.json(response);        
    },

    //#20. 
    register : async (req, res) => {
        const user = new User(req.body);
        const response = await user.register();
        console.log(response);
        return res.json(response); // 클라이언트에게 전달하는 곳 
    }
};



/* 오브젝트 원래 형식인 {key: value} 구조인데, value값을 쓰지 않으면 자동으로 key값과 같은 이름으로 value에 넣게됨. */
module.exports = {
    // hello, /* == { home : home } */
    // login
    output,
    process
}