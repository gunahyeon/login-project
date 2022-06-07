"use strict";

const userid = document.querySelector("#userid"); //선택자
var username = document.querySelector("#username");
var userpsword = document.querySelector("#userpsword");
var confirmPsword = document.querySelector("#confirm-psword");
var registerBtn = document.querySelector("#button");
registerBtn.addEventListener("click", register);

function register() {
    if (!userid.value) return alert("아이디를 입력해주십시오.");
    if (!username.value) return alert("이름을 입력해주십시오.");
    if (!userpsword.value) return alert("비밀번호를 입력해주십시오.");
    if (!confirmPsword.value) return alert("비밀번호 확인란을 입력해주십시오.");
    if(userpsword.value !== confirmPsword.value) return alert("비밀번호가 일치하지 않습니다.");

    const req = {
        userid : userid.value,
        username : username.value,
        userpsword : userpsword.value,
    };

//라우터에게 요청한다.
fetch("/register", {
    method: "POST",
    headers: {
        "Content-Type" : "application/json",
    },
    body: JSON.stringify(req),
}).then((res) => res.json()).
    then((res) => {
        if(res.success) {
            location.href="/login";
        } else {
            if(res.err) return alert(res.err);
            alert(res.msg);
        }
})
.catch((err) => {
    console.log("로그인 중 에러 발생");
})
}; //반환값이 Promise, .json()을 해줘야 다 읽는다.
