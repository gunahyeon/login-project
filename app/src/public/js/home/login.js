"use strict";
 
const id = document.querySelector("#id"); //선택자
var psword = document.querySelector("#psword");
var loginBtn = document.querySelector("button");

loginBtn.addEventListener("click", login);

function login() {
    const req = {
        id : id.value,
        psword : psword.value,
    }
    console.log(req);
}

console.log(id);
console.log("ㅎㅇ");