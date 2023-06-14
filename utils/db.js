var mysql = require("mysql2");
var con = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "newdb",
    password: process.env.SQL_PASS,
});

con.getConnection((err) => {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = con;
