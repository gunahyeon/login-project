"use strict";

const app = require("../app")
const logger=require("../src/config/logger");
const PORT = process.env.PORT || 3000; //환경변수.포트에 접근

app.listen(PORT, () => {
    logger.info(`${PORT} 포트에서 서버가 가동 되었음.`); //짱친절한 로거 만들어놓고 사용하긔~!
});