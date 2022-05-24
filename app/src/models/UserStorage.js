"use strict";

class UserStorage {
    //외부에서 접근할 수 없게 #를 사용하여 데이터를 은닉화를 한다, 메서드로 접근해야한다. , 바로 지정해서 사용할 수 있게 static화한다.
    static #users = {
        id : ["gnh", "구나현", "good"],
        psword : ["1111", "1234", "123456"],
        name : ["gnh", "구나현", "good"],
    };

    // static getUsers(...fields) {
    //     // getUsers 파람으로 (선택한)배열이 여러개 들어온다. ex: getUsers("id","psword")
    //     const users = this.#users;
    //     const newUsers = fields.reduce((newUsers, field)=>{
    //         //새로운 users를 만들어보자
    //         if (users.hasOwnProperty(field)) {
    //             newUsers[field] = users[field];
    //         }
    //         return newUsers; //다른 파라미터의 newUsers로 들어가게 된다.
    //     }, {});
    //     console.log(newUsers);
    //     //newUsers => id, field=> psword(반복문), 로 들어온다. 빈오브젝트는 newUsers를 가리킴.
    //     return newUsers;

    //     //내가 이해한 것 : 전체 오브젝트에서 새로운 오브젝트를 만들어 리턴하는 과정이다.
    // }

    //아이디 받아서 해당하는 유저 정보 던져주기
    static getUserInfo(id) {
        const users = this.#users;
        const idx = users.id.indexOf(id); //입력한 id의 인덱스 찾기.
        const userKeys = Object.keys(users); // => [id, psword, name] : users의 key값들만 배열로 만들기.
        const userInfo = userKeys.reduce((newUser, info)=>{
            newUser[info] = users[info][idx]; //id 인덱스에 해당하는 값들을 다 넣어준것임.
            return newUser;
        }, {});

        return userInfo;
    }
}

module.exports = UserStorage;