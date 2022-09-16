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
    console.log(req);
}

