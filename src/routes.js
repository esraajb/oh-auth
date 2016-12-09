const home = require('./routes/home.route.js');
const login = require('./routes/login.route.js');
const results = require('./routes/results.route.js');
const user_page = require('./routes/user_page.js');
const staticFiles = require('./routes/static.route.js')

module.exports = [
  login,results,home,user_page,staticFiles
];
