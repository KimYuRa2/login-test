"use strict";

//#21. users.json 파일에 접근해서 파일을 읽을 수 있도록 불러옴(file system)
//#22. fs에서 제공하는 promises 불러오기(require("fs").promises)
// => promise는 약속이라는 의미로, Promise가 수행하는 동작이 끝남과 동시에 상태를 알려주기 때문에 "비동기 처리"에 아주 효과적임!
const fs = require("fs").promises;

class UserStorage {
    //#15. 컨트롤러에서 잘라서 가져옴. => 은닉화(# : 해당 변수를 public한 변수에서 private변수로 선언해줌 - 외부에서 접근할 수 없게 됨! - console.log시 undefined로 나옴)
    // => src>databases>data>users.json으로 데이터 옮김(#21.파일에 저장하기)!

    //#22. 가독성을 높이기 위해 은닉화된 함수로 따로 빼기. 은닉화 된 함수는 최상단에 위치해야 함!
    static #getUserInfo(data, id) {
        const users = JSON.parse(data);
        // #21. scope(범위) 때문에 fs안에 넣어줘야 함! (추가적으로, 비동기로 동작하는 것도 한가지 이유임)
        const idx = users.id.indexOf(id);// Users.js > const { id, psword } = UserStorage.getUserInfo("test1"); 에서, "test1"라는 id의 index를 구해서 idx에 넣음
        const userKeys = Object.keys(users); // users의 키값들만 리스트로 만듦 => [id, psword, name]
        const userInfo = userKeys.reduce( (newUser, info) => { // reduce 메서드
            newUser[info] = users[info][idx]; 
            return newUser;
        }, {});
        return userInfo;
    }

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
        //#21. users.json 파일 읽어와보기
        return fs
            .readFile("./src/databases/users.json")
            .then( (data) => {
                return this.#getUserInfo(data, id);
            }) //#22. 성공하면 then 실행 : promise로 반환하게되면 then()이라는 메서드를 접근할 수 있게됨!
            .catch( console.error ); //#22. 오류나면 catch 실행 : promise에 대한 오류 처리는 catch 사용 ,  {(err) => console.error(err)} === {console.error}     
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