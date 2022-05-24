"use strict";

const id = document.querySelector("#id"); //선택자
var username = document.querySelector("#name");
var psword = document.querySelector("#psword");
var confirmPsword = document.querySelector("#confirm-psword");
var registerBtn = document.querySelector("#button");
registerBtn.addEventListener("click", register);

function register() {
    if (!id.value) return alert("아이디를 입력해주십시오.");
    if (!username.value) return alert("이름을 입력해주십시오.");
    if (!psword.value) return alert("비밀번호를 입력해주십시오.");
    if (!confirmPsword.value) return alert("비밀번호 확인란을 입력해주십시오.");
    if(psword.value !== confirmPsword.value) return alert("비밀번호가 일치하지 않습니다.");

    const req = {
        id : id.value,
        name : username.value,
        psword : psword.value,
    };
    console.log(req);
//라우터에게 요청한다.
// fetch("/register", {
//     method: "POST",
//     headers: {
//         "Content-Type" : "application/json",
//     },
//     body: JSON.stringify(req),
// }).then((res) => res.json()).
//     then((res) => {
//         if(res.success) {
//             location.href="/";
//         } else {
//             alert(res.msg);
//         }
// })
// .catch((err) => {
//     console.log("로그인 중 에러 발생");
// })
}; //반환값이 Promise, .json()을 해줘야 다 읽는다.
