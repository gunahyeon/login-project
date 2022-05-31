"use strict";
//mdn http 상태코드 참고하기, status는 백엔드 개발에서 매우 중요한 요소.
//200대 클라이언트 정상 // 400대 클라이언트 실수
//500대 서버 측 에러

const logger = require("../../config/logger");
const { loggers } = require("winston");
const User = require("../../models/User");
// const jwt = require("../../modules/jwt");
const crypto = require("crypto");

//get
const output = {
    home : (req, res) => {
        logger.info(`GET / 304 "홈 화면으로 이동"`); //morgan 은 정상상태를 304로 반환하더라~
        res.render("home/index");
    },    
    login : (req, res) => {
        logger.info(`GET /login 304 "로그인 화면으로 이동"`);
        res.render("home/login");
    },
    register : (req, res) => {
        logger.info(`GET /register 304 "회원가입 화면으로 이동"`);
        res.render("home/register");
    }
}

//post
const process = {
    login : async (req, res) => {
        var key = "rnskqkd";
        const ciper = crypto.createCipher('aes192',key);
        var encrypted_password = ciper.update(req.body.userpsword, 'utf8', 'hex');
        encrypted_password += ciper.final('hex');
        const deciper = crypto.createDecipher('aes192', key);
        var target = encrypted_password;
        var decryped = deciper.update(target,'hex','utf8');
        decryped += deciper.final('utf8');
        console.log("암호화된 패스워드 : ", encrypted_password);
        console.log("복호화된 패스워드 : ", decryped);
        //클래스에 요청데이터를 보내서 user를 인스턴스화(초기화)
        const user = new User({userid : req.body.userid, userpsword : encrypted_password});
        //user login요청
        //console은 뜨지만 undefined 가 뜨네 await 붙여주자.
        const response = await user.login();
        const url = {
            method:"POST",
            path:"/login",
            status: response.err ? 400 : 200,
        }
        log(response,url);
        // const jwtToken = await jwt.sign(user);
        //최종적으로 client 에게 response 전달
        return res.status(url.status).json(response);

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
        // const hash = crypto.createHash("sha256");
        // hash.update(req.body.userpsword);
        // var hash_password = hash.digest('hex');
        var key = "rnskqkd";
        const ciper = crypto.createCipher('aes192',key);
        var encrypted_password = ciper.update(req.body.userpsword, 'utf8', 'hex');
        encrypted_password += ciper.final('hex');

        const user = new User({userid : req.body.userid, username : req.body.username, userpsword : encrypted_password});
        console.log('암호화된 패스워드 :' ,encrypted_password);
        const response = await user.register();
        const url = {
            method:"POST",
            path:"/register",
            status:response.err ? 409 : 201, //새로운 데이터를 생성할때엔 status 201로 반환된다. 
            //409가 아니라 서버 문제라 원래 500대이지만 이 프로젝트는 앵간해서 클라이언트가 잘못 입력한 경우라 ex)duplicate~ 등, 요청이 서버의 상태와 충돌될 때 보내는 상태이다.
        }
        log(response, url);
        return res.status(url.status).json(response);
    }
}

const log = (response, url) => {
    if(response.err) {
        logger.error(
        `${url.method} ${url.path} ${url.status} Response: ${response.success}, ${response.err}`
        );
    }
    else {
        logger.info(
        `${url.method} ${url.path} ${url.status} Response: ${response.success}, ${response.msg || ""} `
        );
    }
}

module.exports = {
    output,
    process
}   