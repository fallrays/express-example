const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PW;
const database = process.env.DB_DATABASE;

const pool = mysql.createPool({
    host,
    user,
    password,
    database,
    connectionLimit: 5,
});

module.exports = pool;