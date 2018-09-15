const mysql = require('mysql2/promise');
const db_conf = require('../config/environments');

module.exports = mysql.createPool(db_conf);