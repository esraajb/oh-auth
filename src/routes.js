const home = require('./routes/home.route.js');
const login = require('./routes/login.route.js');
const results = require('./routes/results.route.js');
//const logout = require('./routes/logout.route.js');

module.exports = [].concat(
  login,results,home
);
