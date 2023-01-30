// const mysql = require('mysql');
const mysql = require('mysql2');

require('dotenv').config();

// const sql = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

const sql = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123!@#",
    database: "project_7",
});

sql.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connection successful !');
});

module.exports = sql;