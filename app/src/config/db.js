//config 예민한 파일들 모아두는 곳.

const mysql = require("mysql");

const db = mysql.createConnection({
    host : process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PSWORD,
    database: process.env.DB_DATABASE,
});

db.connect();

module.exports = db;