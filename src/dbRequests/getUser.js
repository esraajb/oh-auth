const dbConn = require('../db_connection.js');

const byUserId = (cb, userId) => {
  dbConn.query(`SELECT * FROM users WHERE githubid = $1`, [userId], (err, data) => {
    (err ? cb(err) : cb(null, data.rows[0]));
  });
};


module.exports = byUserId;
