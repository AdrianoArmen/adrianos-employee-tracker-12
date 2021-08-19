// connection structure
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",

  password: "",
  
  database: "employees",
});

connection.connect();
