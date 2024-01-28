## nodejs + express 
controller, service, repository 계층 layer

accesstoken발급후 게시글 접근하는 api

토큰은 jwt로 생성

## 설치

    npm i --save express jsonwebtoken mysql2 dotenv nodemon

## 실행
    npm run start

## .env

SERVER_PORT=3000

DB_HOST=localhost

DB_USER=user

DB_PW=1234

DB_DATABASE=test

JWT_SECRET=1234

## 추가예정
db query를 service에서 직접 호출하고 있는데 repository를 따로 분리해야 할거같다
