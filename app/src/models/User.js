"use strict";

const { response } = require("express");
const UserStorage = require("./UserStorage");

class User {
    constructor(body){
        this.body = body;
    }

    async login(){ //#22. 함수 이름 앞에 async를 써서 "비동기 함수"로 만들어주기.
        const client = this.body;
        const {id, psword} = await UserStorage.getUserInfo(client.id); //#22. await : promise를 반환하는 것에만 써줄 수 있는 옵션!!!!!!! + async라는 함수 안에서만 사용 가능!!! => getUserInfo가 다 수행 될 떄까지 await(기다려)
        /* #22.
            UserStorage.js에서
            promise를 반환하기 때문에 .then()으로도 접근하여 데이터를 가져올 수 있음.
            await를 사용해 준 이유는  "가독성" 때문이다.
            fs(파일 시스템)에서도 await으로 가져올 수 있음.(본인 개발 성향에 맞춰 하면 됨)
        */

        if(id){ //id가 있으면
            if( id === client.id && psword === client.psword){ // UserStorage에서 가져온 id(psword)와 클라이언트가 입력한 id(psword)가 같은지 확인
                return {success : true};
            }
            return {success : false, msg : "비밀번호가 틀렸습니다."};
        }
        return {success : false , msg : "존재하지 않는 id입니다."};
    }

    //#20.
    register(){
        const client = this.body;
        const response = UserStorage.save(client);
        return response;
    }


}

module.exports = User;