const home = require('./routes/home.route.js');
const login = require('./routes/login.route.js');
const results = require('./routes/results.route.js');
const user_page = require('./routes/user_page.js');
const Querystring = require('querystring');
//const logout = require('./routes/logout.route.js');

module.exports = [].concat(
  login,results,home,user_page, {
        method: 'GET', path: '/restricted', config: { auth: 'jwt' },
        handler: function(request, reply) {
          console.log('sfsdgsg',request.auth.credentials.accessToken);
        //  console.log(Querystring.parse(request.headers.cookie));
          reply({text: 'You used a Token!'})
          .header("Authorization", request.auth.credentials.accessToken);
        }
      }
);
