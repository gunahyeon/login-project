"use strict";
 
const id = document.querySelector("#id"); //선택자
var psword = document.querySelector("#psword");
var loginBtn = document.querySelector("button");

loginBtn.addEventListener("click", login);

function login() {
    const req = {
        id : id.value,
        psword : psword.value,
    };

fetch("/login", {
    method: "POST",
    headers: {
        "Content-Type" : "application/json",
    },
    body: JSON.stringify(req),
}).then((res)=> res.json()).then((res)=>console.log(res)); //반환값이 Promise, .json()을 해줘야 다 읽는다.
}