"use strict"; //자바스크립트는 항상 작성할 때 ~을 준수하겠다고 작성하는 것이 좋다.

//모듈
const express = require('express'); //서버모듈 부르기
const app = express(); //서버 구동

//라우팅
const home = require("./routes/home");

//앱 세팅
app.set("views", "./views");
app.set("view engine", "ejs");
 
app.use("/", home); //use -> 미들웨어를 등록해주는 메서드.

module.exports = app;

//++package.json 의 역할 : 패키지 관리를 위해 존재, 깃허브에 node_modules가 없어도 npm install을 통하여 dependencies에 있는 것들을 알아서 명시해준다. 그러므로 없어서는 안되는 파일. => 파일이름 쓰지 않고도 npm start로 서버구동할 수 있게 변경해놓음 개꿀
//++package-lock.json 의 역할 : 좀 더 명확한 버전의 라이브러리들이 저장되어 있는 곳, ~과 ^, x등 으로 어디까지 버전범위를 허용하는지에 따라 노드를 사용할 수 있다.