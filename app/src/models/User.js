//로그인, 회원가입 기능 구현하기.
"use strict";

const UserStorage = require("./UserStorage");

class User {
    //생성자
    constructor(body) {
        this.body = body;
    }

    login() {
        const body = this.body;

        //변수대신 바로 아이디만 던져서 해당하는 원하는 사용자 정보들을 오브젝트화해서 받자.
        //++ 음 ,, 그럼 비밀번호틀림과 상관없이 비밀번호까지 들고 오는 거 아닌가,,?
        const {id, psword} = UserStorage.getUserInfo(body.id);
        
        //일단 스토리지에 id값이 있는지 확인.
        if(id) {
            //비밀번호 비교
            if(id === body.id && psword === body.psword) {
                return {success: true};
            }
            return {success: false, msg: "비밀번호가 틀렸습니다."};
        }
        return {success: false, msg: "존재하지 않는 아이디입니다."};
    }
}

module.exports = User;