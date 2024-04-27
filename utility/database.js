const mysql = require('mysql2');

const dbHandler = await mysql.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB,
    user: process.env.USER,
  });

module.exports = dbHandler;