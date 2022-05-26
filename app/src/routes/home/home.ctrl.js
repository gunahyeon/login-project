"use strict";

const logger = require("../../config/logger");
const { loggers } = require("winston");
const User = require("../../models/User");

//get
const output = {
    home : (req, res) => {
        logger.info(`GET / 200 "홈 화면으로 이동"`);
        res.render("home/index");
    },    
    login : (req, res) => {
        logger.info(`GET /login "로그인 화면으로 이동"`);
        res.render("home/login");
    },
    register : (req, res) => {
        logger.info(`GET /register "회원가입 화면으로 이동"`);
        res.render("home/register");
    }
}

//post
const process = {
    login : async (req, res) => {
        //클래스에 요청데이터를 보내서 user를 인스턴스화(초기화)
        const user = new User(req.body);
        //user login요청
        //console은 뜨지만 undefined 가 뜨네 await 붙여주자.
        const response = await user.login();
        if(response.err) logger.error(`POST /login 200 Response: "success: ${response.success}, ${response.err}"`);
        else logger.info(`POST /login 200 Response: "success: ${response.success}, msg: ${response.msg}"`);
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
    register : async (req, res) => {
        const user = new User(req.body);
        const response = await user.register();
        if(response.err) logger.error(`POST /register 200 Response: "success: ${response.success}, ${response.err}"`);
        else logger.info(`POST /register 200 Response: "success: ${response.success}, msg: ${response.msg}"`);
        return res.json(response);
    }
}

module.exports = {
    output,
    process
}   