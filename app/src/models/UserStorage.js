"use strict";

class UserStorage {
    //외부에서 접근할 수 없게 #를 사용하여 데이터를 은닉화를 한다, 메서드로 접근해야한다. , 바로 지정해서 사용할 수 있게 static화한다.
    static #users = {
        id : ["gnh", "구나현", "good"],
        psword : ["1111", "1234", "123456"],
        name : ["gnh", "구나현", "good"],
    };

    static getUsers(...fields) {
        // getUsers 파람으로 (선택한)배열이 여러개 들어온다. ex: getUsers("id","psword")
        const users = this.#users;
        const newUsers = fields.reduce((newUsers, field)=>{
            //새로운 users를 만들어보자
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers; //다른 파라미터의 newUsers로 들어가게 된다.
        }, {});
        console.log(newUsers);
        //newUsers => id, field=> psword(반복문), 로 들어온다. 빈오브젝트는 newUsers를 가리킴.
        return newUsers;
    }
}

module.exports = UserStorage;