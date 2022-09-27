"use strict";

//#21. users.json 파일에 접근해서 파일을 읽을 수 있도록 불러옴(file system)
const fs = require("fs");

class UserStorage {
    //#15. 컨트롤러에서 잘라서 가져옴. => 은닉화(# : 해당 변수를 public한 변수에서 private변수로 선언해줌 - 외부에서 접근할 수 없게 됨! - console.log시 undefined로 나옴)
    // => src>databases>data>users.json으로 데이터 옮김(#21.파일에 저장하기)!

    static getUsers(...fields) { //static 필수(클래스 자체에서 메서드에 접근하려면 필수임) 은닉화 된 users 변수를 외부에서 쓸 수 있도록 함수로 내보내기 처리
        // const users =  this.#users;
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
        // const users = this.#users;

        //#21. users.json 파일 읽어와보기
        fs.readFile("./src/databases/users.json", (err, data) => {
            if(err) throw err;
            // console.log(JSON.parse(data));
            const users = JSON.parse(data);

            // #21. scope(범위) 때문에 fs안에 넣어줘야 함! (추가적으로, 비동기로 동작하는 것도 한가지 이유임)
            const idx = users.id.indexOf(id);// Users.js > const { id, psword } = UserStorage.getUserInfo("test1"); 에서, "test1"라는 id의 index를 구해서 idx에 넣음
            const userKeys = Object.keys(users); // users의 키값들만 리스트로 만듦 => [id, psword, name]
            const userInfo = userKeys.reduce( (newUser, info) => { // reduce 메서드
                newUser[info] = users[info][idx]; 
                return newUser;
            }, {});
            return userInfo;
        })

        

    }

    //#20.
    static save(userInfo){
        // const users = this.#users;
        // 클라이언트에서 데이터를 전달하면, users 오브젝트 안에 해당 데이터들을 저장해야함
        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.psword.push(userInfo.psword);
        // console.log(users);
        return {success : true};
    }

}

module.exports = UserStorage;