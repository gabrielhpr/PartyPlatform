import mysql = require('mysql');
import { promisify } from 'util';

const conn = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: Number(process.env.MYSQL_PORT),
    database: process.env.MYSQL_DATABASE
});

// promise wrapper to enable async await with MYSQL
const connQuery = promisify(conn.query).bind(conn);

module.exports = connQuery;