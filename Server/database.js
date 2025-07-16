const mysql=require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bloodbank"
})

module.exports=db;

