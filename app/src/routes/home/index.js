"use strict";

const express = require("express");
const router = express.Router();
// const authUtil = require("../../middlewares/auth").checkToken;

const ctrl = require("./home.ctrl");

router.get("/", ctrl.output.home); //ctrl.output.home 으로 원랜 명시해주는 것이 좋다.
router.get("/login",ctrl.output.login); 
router.get("/register", ctrl.output.register);

router.post("/login", ctrl.process.login);
router.post("/register", ctrl.process.register);

module.exports = router; //라우터를 외부파일에서 사용할 수 있게 내보내주기
