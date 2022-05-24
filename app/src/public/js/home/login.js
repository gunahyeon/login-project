"use strict";
 
const id = document.querySelector("#id"); //선택자
var psword = document.querySelector("#psword");
var loginBtn = document.querySelector("#button");

loginBtn.addEventListener("click", login);

function login() {
    const req = {
        id : id.value,
        psword : psword.value,
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
            location.href="/";
        } else {
            alert(res.msg);
        }
})
.catch((err) => {
    console.log("로그인 중 에러 발생");
})
}; //반환값이 Promise, .json()을 해줘야 다 읽는다.
