const mysql   = require('mysql');
const config  = require('../config/config');

let mysqlConnection = () => {
    return mysql.createPool({
        host: config[config["FLAG"]].mysql.host,
        user: config[config["FLAG"]].mysql.user,
        password: config[config["FLAG"]].mysql.password,
        database: config[config["FLAG"]].mysql.database
    });
}

module.exports = mysqlConnection();