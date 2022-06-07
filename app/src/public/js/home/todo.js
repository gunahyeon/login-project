"use strict";
 
var todoWhat = document.querySelector("#todoWhat");
var inputBtn = document.querySelector("#button");
var displayname = document.querySelector("#displayname");
inputBtn.addEventListener("click", inputAction);

function inputAction() {
    if (!todoWhat.value) return alert("할 일을 입력해주십시오.");

    // const req = {
    //     todoWhat : todoWhat.value,
    //     userpsword : userpsword.value,
    // };


// //라우터에게 요청한다.
// fetch("/login", {
//     method: "POST",
//     headers: {
//         "Content-Type" : "application/json",
//     },
//     body: JSON.stringify(req),
// }).then((res) => res.json()).
//     then((res) => {
//         if(res.success) {
//             // location.href="/";
//             displayname.innerHTML = `안녕하세요, ${res.username}님!`;
//         } else {
//             if(res.err) return alert(res.err);
//             alert(res.msg);
//         }
// })
// .catch((err) => {
//     console.log("로그인 중 에러 발생");
// })
}; //반환값이 Promise, .json()을 해줘야 다 읽는다.
