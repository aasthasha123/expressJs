const mysql = require('mysql2')
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodeJs',
    password: 'aastha',
}); // POOL OF CONNECTIONS

module.exports = pool.promise();