// connection structure
const mysql = require("mysql");
const dotenv = require('dotenv');
const util = require("util");




const connection = mysql.createConnection({
    
  host: 'localhost',
  user: 'root',
  password: 'mypass',

  database: 'employees',
});

connection.connect();


// query connection function allow async promises to be used
connection.query = util.promisify(connection.query);

module.exports = connection;
