const mysql = require('mysql2');

const dbHandler = await mysql.createPool({
    host: 'localhost',
    database: 'test',
    user: 'root',
  });

module.exports = dbHandler;