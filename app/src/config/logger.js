const {createLogger, transports, format} = require("winston"); //지저분하니까 키워드 없이 접근하게 오브젝트로 만들기.
const {combine, timestamp, json, simple, colorize, printf, level, message, label} = format; // 쓰고 싶은 거 여기에 정리해.

const printFormat = printf(({timestamp, label, level, message})=>{
    return `${timestamp} [${label}] ${level} : ${message}`;
}) //출력되는 형식 지정, 끝에 넣어주면돼.

const printLogFormat = {
    file:combine(
    label({
        label : "처음 시작하는 백엔드",
    }),
    timestamp({
        format: "YYYY-MM-DD HH:mm:dd",
    }),
    printFormat,
    ),
    console:combine(
        colorize(), //컬러로 표시
        simple()
    )
};


// 로그 파일로 볼래 콘솔로 볼래?
const opts = {
    file:new transports.File({
        filename:"access.log",
        dirname:"./logs",
        level:"info", //에러수준까지 출력, info수준까지만 출력해.
        format : printLogFormat.file,
    }), 
    console:new transports.Console({
        level:"info", //에러수준까지 출력, info수준까지만 출력해.
        format : printLogFormat.console,
    }),
}

const logger = createLogger({
    transports:[opts.file], 
});

//서비스용 서버와 개발용 서버를 지정해서 배포할 수 있게..환경변수로 구분하자.
if (process.env.NODE_ENV !== "production") { 
    logger.add(opts.console);
}

logger.stream = {
    write: (message) => logger.info(message),
};
module.exports = logger;