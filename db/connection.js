// connection structure
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
});

connection.connect();

