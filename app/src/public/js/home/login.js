"use strict";
//#10. DOM을 사용하여 js에서 html에 존재하는 데이터들을 가져와서 제어할 수 있도록 함!
console.log("ggigiigigi");
console.log("ssssszzzzzㅋㅋ");

const id = document.querySelector('#id'); //DOM 사용하기
const psword = document.querySelector('#psword');
const loginBtn = document.querySelector('#loginBtn'); //== button

loginBtn.addEventListener("click", login ); // loginBtn에 click이벤트 발생 시 login 함수 실행시킴

function login(){
    console.log(id.value); //id에 들어있는 값을 가져오는 방법: tag의 value에 접근하기!
    const req = {
        id : id.value,
        psword : psword.value,
    };
    
    // #11. fetch로 프론트에서 데이터 전달하기
    fetch('/login', {
        //json이라는 데이터타입을 이용해서 데이터를 전달하기
        /*
            req를 json형태로 감싸주어야 함 (json.stringify(req) 라는 메서드를 이용)
             => stringify : req(object)를 문자열로 바꿔주는 메서드
        */
        method : "POST", //restAPI 강의 참고
        headers : { //내가 전달하는 데이터가 json형태임을 알려주기
            "Content-Type" : "application/json", // application/json의 형태로 json데이터를 전달한다
        },
        body: JSON.stringify(req)
    })

    console.log(req);
    console.log(JSON.stringify(req)); //key값과 value값이 모두 문자열로 감싸짐

}

