const Hapi = require('hapi');
const Inert = require('inert');
const env = require('env2')('./config.env');
const Vision = require('vision');
const routes = require('./routes.js');
const HapiAuthJWT2 = require('hapi-auth-jwt2');
const jwt = require('jsonwebtoken');
const options = {
    connections: {
        state: {
            isSameSite: 'Lax'
        }
    }
};
const server = new Hapi.Server(options);
const validate = require('./validate.js');
server.connection({
  port: process.env.PORT || 4000
});


server.register([Inert, Vision, HapiAuthJWT2],
  (err) => {
    if(err) throw err;
    server.auth.strategy('jwt', 'jwt',
    { key: process.env.SECRET,
      validateFunc: validate,
      verifyOptions: { algorithms: [ 'HS256' ] }
    });
    server.views({
      engines: { html: require('handlebars') },
      relativeTo: __dirname,
      path: '../views',
      layout: 'default',
      layoutPath: '../views/layouts',
      partialsPath: '../views/partials',
    });
    server.route(routes);
  }
);

module.exports = server;
