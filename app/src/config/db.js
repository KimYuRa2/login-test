const mysql = require("mysql"); // npm i mysql --save
const db = mysql.createConnection ({
    host : "login-lecture.chsjd3aut6vh.ap-northeast-2.rds.amazonaws.com", // db 엔드포인트
    user : "admin",
    password : "12345678",
    database : "login_lecture",
});

db.connect();

module.exports = db;