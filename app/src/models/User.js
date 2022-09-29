"use strict";

const { response } = require("express");
const UserStorage = require("./UserStorage");

class User {
    constructor(body){
        this.body = body;
    }

    async login(){ //#22. 함수 이름 앞에 async를 써서 "비동기 함수"로 만들어주기.(await은 async 안에서만 동작가능함.)
        const client = this.body;
        try{
            const user = await UserStorage.getUserInfo(client.id); //getUserInfo 메서드가 반환하는 것이" Promise객체"이기 때문에!! 해당 데이터(client.id)를 다 받아올때까지 기다리(await)라고 설정해주는 것.

            if(user){
                if( user.id === client.id && user.psword === client.psword ){
                    return {success : true};
                }
                return {success : false, msg : "비밀번호가 틀렸습니다."};
            }
            return {success : false, msg : "존재하지 않는 아이디입니다."};
        }catch (err) {
            return { success : false, err };
        }
        // const {id, psword} = await UserStorage.getUserInfo(client.id); 
        /* #22.
            UserStorage.js에서
            promise를 반환하기 때문에 .then()으로도 접근하여 데이터를 가져올 수 있음.
            await를 사용해 준 이유는  "가독성" 때문이다.
            fs(파일 시스템)에서도 await으로 가져올 수 있음.(본인 개발 성향에 맞춰 하면 됨)
        */

        // if(id){ //id가 있으면
        //     if( id === client.id && psword === client.psword){ // UserStorage에서 가져온 id(psword)와 클라이언트가 입력한 id(psword)가 같은지 확인
        //         return {success : true};
        //     }
        //     return {success : false, msg : "비밀번호가 틀렸습니다."};
        // }
        // return {success : false , msg : "존재하지 않는 id입니다."};
    }

    //#20.
    async register(){
        const client = this.body;
        try{
            const response = await UserStorage.save(client);
            // console.log(response);
            return response; //UserStorage.js에서 에러를 throw할 수 있게 됨
        } catch (err) {
            return { success : false, msg : err };
        }
        
    }


}

module.exports = User;