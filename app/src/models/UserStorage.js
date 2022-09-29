// db에 접근하는 모델!
"use strict";

// #25. db 연결
const db = require("../config/db"); 

class UserStorage {
    // #26. private한 함수들은 필요없어서 다 지워버림

    // static getUsers(isAll, ...fields) { //static 필수(클래스 자체에서 메서드에 접근하려면 필수임) 은닉화 된 users 변수를 외부에서 쓸 수 있도록 함수로 내보내기 처리
        
    // }

    static getUserInfo(id) { // 내가 요청한 id에 해당하는 데이터들만 가져오는 메서드
        //#25. db와 연동된 로그인 기능 만들기
        /*
            1) 클라이언트 쪽에서 login버튼을 누르는 순간,
            2) (routes>home>index.js - router.post("/login", ctrl.process.login);) 를 통해 login 메서드로 post요청이 감 
            3) (routes>home>home.ctrl.js 의 process - login함수)그러면 login 함수가 실행이 됨.
            4) (models>User.js) User.js파일 내의 login 함수 내에서 , UserStorage 안의 getUserInfo 실행해서 user정보를 불러옴.(const {id, psword} = await UserStorage.getUserInfo(client.id);)
            5) user정보를 가져왔으니. UserStorage.js-getUserInfo(이곳) 안에서 db에 접근 후에, user 정보를 반환해주면 됨!
        */
       // 이 Promise는 시간이 오래 걸리는 구문을 실행시킬 때 필요함
       // 함수는 한가지 기능만 수행하도록 구현해줘야함. Promise로 만들어주지 않으면 하나의 함수에서 DB를 조회하고, 로그인정보를 검증하고, 클라이언트에 응답까지 해주는 이상한 코드가 만들어짐
       // 클래스는 User와 UserStorage처럼 "각자의 역할을 분명하게 구분"시켜주는 것이 좋음!!!
       // UserStorage에서는 DB를 CRUD(생성/읽기/수정/삭제)하는 역할만 수행하고,
       // User은 해당 데이터를 가지고 검증 및 조작을 수행하도록 역할을 구분함.
        return new Promise( (resolve, reject) => { //promise 안의 db.query구문이 성공하면 resolve를 실행하고, 실패 시 reject
            const query = " SELECT * FROM users WHERE id = ? ;";
            db.query( query , [id] , (err, data) => { //db에 쿼리 날리기!!( 쿼리문(id=?) ,[?에 넣어줄 변수], 콜백함수(err, 읽어온 data) ))
                console.log(data);
                if(err) reject(`${err}`); // err를    ``으로 감싸서 문자열로 던짐.
                resolve(data[0]); // 배열로 감싸져서 날아오기 떄문에 , 배열 안의 RowDataPacket만 가져오기 위해 배열의 0번지 데이터만(data[0]) 가져오도록 한다.
            });
        })
    }


    static async save(userInfo){
        return new Promise( (resolve, reject) => { //promise 안의 db.query구문이 성공하면 resolve를 실행하고, 실패 시 reject
            const query = " INSERT INTO users (id, name, psword) VALUES (?,?,?) ; ";
            db.query( query , [ userInfo.id, userInfo.name, userInfo.psword ] , (err) => { //db에 쿼리 날리기!!( 쿼리문(id=?) ,[?에 넣어줄 변수], 콜백함수(err, 읽어온 data => 저장하는 것이기 때문에 읽어올 data없으므로 쓰지않음!) ))
                if(err) reject(`${err}`); // err를    ``으로 감싸서 문자열로 던짐.
                resolve( { success : true } );
            });
        })
    }

}

module.exports = UserStorage;