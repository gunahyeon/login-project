"use strict";

const fs = require("fs").promises;

class UserStorage {
    // 은닉화한 메서드는 항상 최상단에 올려주는게 좋다. 코딩문화.
    static #getUserInfo(data, id){
        const users = JSON.parse(data);
        const idx = users.id.indexOf(id); //입력한 id의 인덱스 찾기.
        const userKeys = Object.keys(users); // => [id, psword, name] : users의 key값들만 배열로 만들기.
        const userInfo = userKeys.reduce((newUser, info)=>{
            newUser[info] = users[info][idx]; //id 인덱스에 해당하는 값들을 다 넣어준것임.
            return newUser;
        }, {});

        return userInfo;
    }

    static #getUsers(data, isAll , fields) {
        //모든 객체들이 들어오면 바로 return 하겠다.
        // getUsers 파람으로 (선택한)배열이 여러개 들어온다. ex: getUsers("id","psword")
        const users = JSON.parse(data);
        if(isAll) return users;
        const newUsers = fields.reduce((newUsers, field)=>{
            //새로운 users를 만들어보자
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers; //다른 파라미터의 newUsers로 들어가게 된다.
        }, {});
        //newUsers => id, field=> psword(반복문), 로 들어온다. 빈오브젝트는 newUsers를 가리킴.
        return newUsers;

        //내가 이해한 것 : 전체 오브젝트에서 새로운 오브젝트를 만들어 리턴하는 과정이다.
    }

    //외부에서 접근할 수 없게 #를 사용하여 데이터를 은닉화를 한다, 메서드로 접근해야한다. , 바로 지정해서 사용할 수 있게 static화한다.
    static getUsers(isAll, ...fields) {
        return fs
        .readFile("./src/databases/users.json") 
        .then((data)=>{
            return this.#getUsers(data, isAll ,fields);
        })
        .catch(console.error);
    }

    //아이디 받아서 해당하는 유저 정보 던져주기
    static getUserInfo(id) {
        //promise를 반환하면 then, catch이라는 메서드를 사용할 수 있다.
        return fs.
        readFile("./src/databases/users.json") 
        .then((data)=>{
            //가독성을 위해 은닉화하여 분리
            return this.#getUserInfo(data, id);
        })
        .catch(console.error);
    }

    static async save(userInfo) {
        // const users = await this.getUsers("id","psword","username");
        // 모든 데이터 값 가져오라는 의미는 true로 작성하면됑.
        const users = await this.getUsers(true);
        console.log(users);
        if(users.id.includes(userInfo.id)) {
            throw "이미 존재하는 아이디입니다.";
        }
        users.id.push(userInfo.id);
        users.username.push(userInfo.username);
        users.psword.push(userInfo.psword);
        //데이터추가
        fs.writeFile("./src/databases/users.json", JSON.stringify(users));
        return {success : true};
    }
}

module.exports = UserStorage;