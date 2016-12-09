const home = require('./routes/home.route.js');
const login = require('./routes/login.route.js');
const results = require('./routes/results.route.js');
const user_page = require('./routes/user_page.js');
const Querystring = require('querystring');

module.exports = [].concat(
  login,results,home,user_page, {
        method: 'GET', path: '/restricted', config: { auth: 'jwt' },
        handler: function(request, reply) {
          reply({text: 'You used a Token!'})
          .header("Authorization", request.auth.credentials.accessToken);
        }
      }
);
