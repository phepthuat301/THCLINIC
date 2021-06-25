const mysql = require("mysql");
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "thclinic",
    timezone:"gmt",
  });

module.exports = db;