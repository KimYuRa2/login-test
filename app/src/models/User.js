"use strict";

const UserStorage = require("./UserStorage");

class User {
    constructor(body){
        this.body = body;
    }

    login(){
        const body = this.body;
        const { id, psword } = UserStorage.getUserInfo(body.id);
        console.log(id,psword);

        if(id){ //id가 있으면
            if( id === body.id && psword === body.psword){ // UserStorage에서 가져온 id(psword)와 클라이언트가 입력한 id(psword)가 같은지 확인
                return {success : true};
            }
            return {success : false, msg : "비밀번호가 틀렸습니다."};
        }
        return {success : false , msg : "존재하지 않는 id입니다."};
    }
}

module.exports = User;