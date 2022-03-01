import mysql = require('mysql');
import { promisify } from 'util';

const conn = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '&N61al97',
    database: 'LOCFESTAS',
});

// promise wrapper to enable async await with MYSQL
const connQuery = promisify(conn.query).bind(conn);

module.exports = connQuery;