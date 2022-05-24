"use strict";

const User = require("../../models/User");

const output = {
    home : (req, res) => {
        res.render("home/index");
    },    
    login : (req, res) => {
        res.render("home/login");
    },
}

const process = {
    login : (req, res) => {
        //클래스에 요청데이터를 보내서 user를 인스턴스화(초기화)
        const user = new User(req.body);
        //user login요청
        const response = user.login();
        //최종적으로 client 에게 response 전달
        return res.json(response);

        // 컨트롤러에서 모델을 다루는 건 좋지 않아. model로 분리!
        // const id = req.body.id;
        // const psword = req.body.psword;

        // const users = UserStorage.getUsers("id","psword"); //id, password 모델에서 검증하기
        
        // const response = {};
        // if(users.id.includes(id)) {
        //     const idx = users.id.indexOf(id);
        //     if(users.psword[idx] === psword) {
        //         response.success = true;
        //         return res.json(response);
        //     }
        // }

        // response.success = false;
        // response.msg = "로그인에 실패하셨습니다."
        // return res.json(response);
    },
}

module.exports = {
    output,
    process
}   