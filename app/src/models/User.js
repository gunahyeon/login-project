//로그인, 회원가입 기능 구현하기.
/**
 * User.js : 해당 데이터 검증 및 조작하는 file
 * 
 */

"use strict";

const UserStorage = require("./UserStorage");

class User {
    //생성자
    constructor(body) {
        this.body = body;
    }

    async login() {
        const client = this.body;

        //변수대신 바로 아이디만 던져서 해당하는 원하는 사용자 정보들을 오브젝트화해서 받자.
        //++ 음 ,, 그럼 비밀번호틀림과 상관없이 비밀번호까지 들고 오는 거 아닌가,,?
        //<pending> 이라는 객체가 반환이 되는 것은 비동기처리가 되고 있다는 것, 다 읽을 때까지 기다리라는 의미로 await을 끼워준다.
        //promise를 반환하는 애에게만 await적용할 수 있음!!! => 가독성
        //await은 async 함수 내에서만 사용할 수 있음 => 짝궁
        //async 는 await이 실행되는 함수 앞에서만 걸어줘야한다.
        try {
        const {id, psword} = await UserStorage.getUserInfo(client.id);
        console.log("id" , id);
        //일단 스토리지에 id값이 있는지 확인.
        if(id) {
            //비밀번호 비교
            if(id === client.id && psword === client.psword) {
                return {success: true};
            }
            return {success: false, msg: "비밀번호가 틀렸습니다."};
        }
        return {success: false, msg: "존재하지 않는 아이디입니다."};
    } catch(err) {
        console.log(err);
        return {success : false, err};
    }
}

    async register() {
        const client = this.body;
        try {
        const response = await UserStorage.save(client);
        return response;
        } catch (err) {
            return {success : false, err};
        }
    }
}

module.exports = User;