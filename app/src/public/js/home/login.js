"use strict";
 
const userid = document.querySelector("#userid"); //선택자
var userpsword = document.querySelector("#userpsword");
var loginBtn = document.querySelector("#button");
var displayname = document.querySelector("#displayname");
loginBtn.addEventListener("click", login);

function login() {
    if (!userid.value) return alert("아이디를 입력해주십시오.");
    if (!userpsword.value) return alert("비밀번호를 입력해주십시오.");

    const req = {
        userid : userid.value,
        userpsword : userpsword.value,
    };


//라우터에게 요청한다.
fetch("/login", {
    method: "POST",
    headers: {
        "Content-Type" : "application/json",
    },
    body: JSON.stringify(req),
}).then((res) => res.json()).
    then((res) => {
        if(res.success) {
            // location.href="/";
            displayname.innerHTML = `안녕하세요, ${res.username}님!`;
        } else {
            if(res.err) return alert(res.err);
            alert(res.msg);
        }
})
.catch((err) => {
    console.log("로그인 중 에러 발생");
})
}; //반환값이 Promise, .json()을 해줘야 다 읽는다.
