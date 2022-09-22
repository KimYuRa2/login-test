"use strict";

class UserStorage {
    //#15. 컨트롤러에서 잘라서 가져옴. => 은닉화(# : 해당 변수를 public한 변수에서 private변수로 선언해줌 - 외부에서 접근할 수 없게 됨! - console.log시 undefined로 나옴)
    static #users = { // home.ctrl.js > UserStorage 클래스 자체에서 users에 접근하고자 할 때, users라는 변수에 static을 써서 정적 변수로 만들어줘야 함.
        id : ["test1", "test2", "test3"],
        psword : ["1234", "12345", "123456"],
        name : ["테스트1", "테스트2", "테스트3"]
    }

    static getUsers(...fields) { //static 필수(클래스 자체에서 메서드에 접근하려면 필수임) 은닉화 된 users 변수를 외부에서 쓸 수 있도록 함수로 내보내기 처리
        const users =  this.#users;
        const newUsers = fields.reduce((newUsers, field) => { // reduce(배열메서드) - 반복문 -- fields에 대한 원소가 하나씩 순회됨.  newUsers에는 fields라는 배열의 초기값이 들어가고, 그 다음 변수들은 field에 들어오게 됨
            console.log(newUsers, field);
            if(users.hasOwnProperty(field)){ //users에 field(해당하는 키 값)가 존재하는가? : 먼저 id가 있으면 그 id에 해당하는 값을 
                newUsers[field] =  users[field];
            }
            return newUsers;
        }, {}); // {}라고 쓰면 console.log(newUsers, field);찍으면 {} id , undefined psword 라고 들어감
        console.log(newUsers);
        return newUsers;
    }

    static getUserInfo(id) { // 내가 요청한 id에 해당하는 데이터들만 가져오는 메서드
        const users = this.#users;
        const idx = users.id.indexOf(id);// Users.js > const { id, psword } = UserStorage.getUserInfo("test1"); 에서, "test1"라는 id의 index를 구해서 idx에 넣음
        const userKeys = Object.keys(users); // users의 키값들만 리스트로 만듦 => [id, psword, name]
        const userInfo = userKeys.reduce( (newUser, info) => {
            newUser[info] = users[info][idx];
            return newUser;
        }, {});
        return userInfo;
    }

}

module.exports = UserStorage;