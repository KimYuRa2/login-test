"use strict";

const { response } = require("express");
const UserStorage = require("./UserStorage");

class User {
    constructor(body){
        this.body = body;
    }

    login(){
        const client = this.body;
        const { id, psword } = UserStorage.getUserInfo(client.id);
        console.log(id,psword);

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