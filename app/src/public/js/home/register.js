"use strict";
//#10. DOM을 사용하여 js에서 html에 존재하는 데이터들을 가져와서 제어할 수 있도록 함!

const id = document.querySelector('#id'); //DOM 사용하기
const name = document.querySelector('#name'); 
const psword = document.querySelector('#psword');
const confirmPsword = document.querySelector('#confirm-psword');
const registerBtn = document.querySelector('#button'); //== button

registerBtn.addEventListener( "click", register ); // registerBtn에 click이벤트 발생 시 register 함수 실행시킴

function register(){
    if( !id.value ){ // 오류 : 아이디 입력창이 비었음
        alert("아이디를 입력해 주십시오.");
    } 
    //#20. 입력한 비밀번호(psword)와 입력한 비밀번호 확인(confirnPsword)이 일치하는지 확인하기
    //#23. 오류 수정 - psword 태그 자체가 아닌 그 태그 안에 입력된 값을 비교해야해서 psword.value !== confirmPsword.value로 수정
    if( psword.value !== confirmPsword.value ){
        return alert("비밀번호가 일치하지 않습니다");
    }
    console.log(id.value); //id에 들어있는 값을 가져오는 방법: tag의 value에 접근하기!
    const req = {
        id : id.value,
        name : name.value,
        psword : psword.value,
    };
    
    // #11. fetch로 프론트에서 데이터 전달하기
    fetch('/register', {
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
    .then( (res) => res.json() ) // 서버에서 응답을 받아오면 then 실행
    .then( (res) => {
        if(res.success) {
            location.href = "/login";
        }else{
            alert(res.msg);
        }
    } ) //promise 타입을 then메소드로 다시 접근
    //.then( (res) => console.log(res) ); => .then (console.log); 로 생략 가능..!!!!! 이렇게 써도 위처럼 res를 받아서 console.log로 res를 찍어줌
    .catch( (err) => {
        console.error(new Error("회원가입 중 에러 발생"));
    });
    /*
        .then( (res) => console.log(res.json())) 실행 시 , Promise데이터가 날라옴!
        - res.json()의 반환값은 Response 스트림인데, ".json()" 메서드를 통해 Response(응답) 스트림을 읽을 수 있다.
        - Response는 데이터가 모두 받아진 상태가 아님!!
        - ".json()"으로 Response 스트림을 가져와 완료될 때까지 읽는다. 다 읽은 body의 텍스트를 Promise 형태로 반환한다.
    */

    console.log(req);
    console.log(JSON.stringify(req)); //key값과 value값이 모두 문자열로 감싸짐

}

