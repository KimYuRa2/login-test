const mysql = require("mysql"); // npm i mysql --save
const db = mysql.createConnection ({ // #27. 환경변수 등록(.env)
    host : process.env.DB_HOST, // db 엔드포인트
    user : process.env.DB_USER,
    password : process.env.DB_PSWORD,
    database : process.env.DB_DATABASE,
});

db.connect();

module.exports = db;