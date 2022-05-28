//상단에 npm으로 설치한 패키지 express를 불러옴
//const로 선언하며 다른 값으로 덮어쓰는 것 방지
const express = require("express");

//express 인스턴스 생성
const app = express();

//POST 의 body에 사용자 입력을 받을 수 있도록 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//파일을 읽고 쓸 수 있게 해주는 기본 모듈
//npm install 로 설치할 필요가 없이 내장되어 있음
const fs = require("fs");

const req = require("express/lib/request");
const res = require("express/lib/response");
const { send } = require("process");

//static file을 서버에서 전달하도록 설정
app.use(express.static("public"));

//라우트 추가 (인터넷의 주소에 대응. "/"의 경우에는 root 페이지를 뜻함)
app.get("/", (_req, res)=>{
    res.send("Hello World!");
});

//Json을 출력해주는 라우트
app.get("/posts", function (_req, res){
    res.json([
        { postId: 1, title: "Hello!" },
        { postId: 2, title: "World!" },
    ]);

});

app.post("/write-file", function(req, res) {
    console.log(req.body);

    //만약 post body에 content 라는 값이 없으면 400 BAD REQUEST 에러
    if (!req.body?.content) {
        res.status(400).send("400 에러! content가 post body에 없습니다.");
        return;
    }

    fs.writeFile("test.txt", req.body.content, function (error, data) {
        if(error){
            //파일 저장 중 문제가 발생하면 500 서버 에러 변환
            res.status(500).send("500 서버 에러!");
        } else {
            //파일 저장에 성공했다면 201 코드 반환
            res.status(201).send("파일 생성 성공!");
        }
    });
});

app.get("/read-file", function (req, res){
    console.log(req.query);

    if(!req.query?.file){
        res.status(400)/send("400에러! file이 query parameters에 없습니다.");
        return;
    }

    fs.readFile(req.query.file, "utf-8", async function (error, data) {
        if(error){
            if(error.code === "ENOENT"){
                //파일이 없을 때는 404 에러 반환
                res.status(404).send(`${req.query.file}이 없습니다.`);
            } else {
                res.status(500).send("500 서버 에러!");
            }
        } else {
            //파일을 읽어서 string으로 변환하여 전송
            res.status(200).send(data.toString());
        }
    });
});

//어떤 포트를 통해 서버에 접속하게 할 것인지 지정
//process.env.PORT: 서버의 환경 변수에 등록된 port 정보를 이용
//만약에 환경 변수에 PORT 정보가 등록되어 있지 않다면 8000번을 기본값으로 이용함
const PORT = process.env.PORT || 8000;

//서버가 PORT 에 연결됐을 때 수행할 함수 정의
app.listen(PORT, () => {
    console.log("서버가 실행됐습니다.");
    console.log(`서버주소: http://localhost:${PORT}`);
});



