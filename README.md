## nodejs + express 
controller, service, repository 계층 layer

accesstoken발급후 게시글 접근하는 api

토큰은 jwt로 생성

## 설치

    npm i --save express jsonwebtoken mysql2

## .env

SERVER_PORT=3000

DB_HOST=localhost

DB_USER=user

DB_PW=1234

DB_DATABASE=test

JWT_SECRET=1234
