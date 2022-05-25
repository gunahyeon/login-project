"use strict"; //자바스크립트는 항상 작성할 때 ~을 준수하겠다고 작성하는 것이 좋다.

//모듈
const express = require('express'); //서버모듈 부르기
const bodyParser = require("body-parser"); //post body보는 방법, npm install body-parser --save
const dotenv = require("dotenv"); //환경변수 등록해주는 방법 운영체제가 달라도 실행이가능하다.
dotenv.config(); //.env.파일에 접근하는 함수.

const app = express(); //서버 구동

//라우팅
const home = require("./src/routes/home");

//앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");
 
app.use(express.static(`${__dirname}/src/public`)); // static 파일을 사용하기 위한 익스프레스, 정적 파일 사용, ${__dirname}은 현재 app.js가 있는 위치를 반환한다.ㅇ
app.use(bodyParser.json()); // 파서가 제이슨 해석할 수 있게해줌.
app.use(bodyParser.urlencoded({extended:true})); //url을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결.

app.use("/", home); //use -> 미들웨어를 등록해주는 메서드.

module.exports = app;

// package.json 의 역할 : 패키지 관리를 위해 존재, 깃허브에 node_modules가 없어도 npm install을 통하여 dependencies에 있는 것들을 알아서 명시해준다. 그러므로 없어서는 안되는 파일. => 파일이름 쓰지 않고도 npm start로 서버구동할 수 있게 변경해놓음 개꿀

// package-lock.json 의 역할 : 좀 더 명확한 버전의 라이브러리들이 저장되어 있는 곳, ~과 ^, x등 으로 어디까지 버전범위를 허용하는지에 따라 노드를 사용할 수 있다.

// *** 깃 업로드 과정 ***
// 깃에 업로드 하기 전 터미널에서 nano README.md => 편하게 작성 , nano .gitignore => /node_modules 는 깃에 업로드 x해주세요!!!!!!! 작성해주기.
// git add . or git add --all 하면 모든 파일이 초록색으로 변함. 현재 스테이징 영역에 잘 올라간 것이다.
// git commit -m => 어떠한 메시지를 사용해서 커밋할 것인지 작성하는 것임. => git commit -m "깃 저장소 초기화"
// git remote -v => 현재 워킹 디렉토리 가르켜주기
// git remote add origin(이라는 이름) => +내 repository 복사해서 붙여넣기 하면 돼 암묵적인 룰.
// git push origin master

// 나중에 프로젝트 받을 때
// git clone 주소 (+폴더명 지정) => npm i 하면 사용할 수 있는 모듈들 알아서 다 받아쥼.

// 깃허브 폴더 정리법 : src폴더 만들고 상위 폴더 만들어서 안에 잘 정리해주면 된다.

// 라이센스 받는 법 : 깃허브 홈피 => insights => community standards => mit => direct master branch 옵션 선택 해서 절차 밟으면 됨ㅇㅇ.

// git pull origin master 
// 깃 폴더 관리 잘하면 나중에 코드 생산성이 좋아진다.

// 업로드 할 때 git reset HEAD . => node_modules 안들어가게 해야해! .gitignore 의 경로가 꼬였기 때문에 앞에 **로 수정. 그럼 이제 적용될거야.

// git add . => git status 로 올라갈 파일 체크.
// git commit -m "소스 코드 src로 분류" 이제 깔끔해졌쥬.

// git about에 가서 description topics 이런거 명시해주면 뭔가 열심히 공부한 티가 나겠지?? ㅇㅇ

// 노드몬 : 라이브 서버 구동 => nodemon ./bin/www.js

// git tag v0.1.0 => 태그로 버전 입력해주기
// git push origin v0.1.0--notDB => 하고 To~url 등등 나오면 잘된 것임.
// git push origin :v0.1.0--notDB => 콜론은 태그 삭제임.
// git tag -d v0.1.0--notDB => 로컬에서 태그 삭제
// git log --oneline => 그동안 커밋 내용 한줄로 확인하기

