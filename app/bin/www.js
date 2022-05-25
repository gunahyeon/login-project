"use strict";

const app = require("../app")
const PORT = process.env.PORT || 3000; //환경변수.포트에 접근

app.listen(PORT, () => {
    console.log("서버 가동");
});