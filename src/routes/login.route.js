const env = require('env2')('./config.env');
const Querystring = require('query-string');


const login = {
  method: 'GET',
  path: '/login',
  handler: (request,reply) => {
    let query={
      client_id : process.env.CLIENT_ID,
      redirect_uri : process.env.BASE_URL + '/results'
    }
    reply.redirect('https://github.com/login/oauth/authorize/?'+Querystring.stringify(query));
  }

}

module.exports = login;
