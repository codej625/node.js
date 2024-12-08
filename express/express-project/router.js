"use strict";
// 모듈을 불러온다.
const express = require("express");
const figlet = require("figlet");
const cors = require("cors");
require("dotenv").config(); // 환경 변수를 관리하는데 사용되는 모듈
// 유저 컨트롤러를 불러온다.
const userController = require("./controller/user-controller");
const app = express();
const path = require("path");
const port = process.env.PORT || 8080;
// 정적 파일 제공 설정
app.use(express.static(path.join(__dirname, "public")));
// CORS 미들웨어 설정
app.use(cors());
// Root path
app.get("/", (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "public/html", "index.html"));
    }
    catch (error) {
        res.status(500).send("server error");
    }
});
// 사용자 컨트롤러 라우터 설정
app.use("/user", userController);
// 서버 시작 및 포트 리스닝
app.listen(port, () => {
    figlet(`odej625 Server Port: ${port}`, (err, data) => {
        if (err) {
            console.dir(err);
            return false;
        }
        console.log(data);
    });
});
