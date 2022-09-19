// #3. 컨트롤러 분리
"use strict";


//#13. 일단 컨트롤러 자체에서 해당 데이터 만들어놓기
const users = {
    id : ["test1", "test2", "test3"],
    psword : ["1234", "12345", "123456"],
}

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
    }
}

//#12. #13. 
const process = {
    login : (req, res) => {
        /* 
        login.js에서 body로 req를 전달했으므로
        해당 body를 보려면 요청(req)에서 body로 접근을 해야함(req.body).
        근데 이 req.body를 보려면, 잘 parsing해올 수 있도록 하는 body-parser 모듈 필요함! (app.js 참고)
        */
        // console.log(req.body);
        const id = req.body.id;
        const psword = req.body.psword;

        console.log(id, psword);

        if(users.id.includes(id)){ // 요청한 id가 있으면
            const idx = users.id.indexOf(id); // 요청한 id의 index를 idx라는 변수에 저장함
            if( users.psword[idx] === psword ){ // 요청한 id가 있음 => 요청한 psword 확인 성공 => 로그인 성공
                return res.json({ // 로그인이 성공했다는 object를 json으로 만들어서, 프론트로 res(응답)를 보내줌
                    success : true,
                });
            }
        }

        return res.json({
            success : false,
            msg : "로그인에 실패하셨습니다.",
        });
    }
}



/* 오브젝트 원래 형식인 {key: value} 구조인데, value값을 쓰지 않으면 자동으로 key값과 같은 이름으로 value에 넣게됨. */
module.exports = {
    // hello, /* == { home : home } */
    // login
    output,
    process
}