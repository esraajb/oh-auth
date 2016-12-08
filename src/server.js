const Hapi = require('hapi');
const Inert = require('inert');
const env = require('env2')('./config.env');
const Vision = require('vision');
const routes = require('./routes.js');
const handlebars = require('./configure_handlebars');
// const cookieAuth = require('hapi-auth-cookie');

const server = new Hapi.Server();

server.connection({
  port: process.env.PORT || 4000
});

server.register([Inert, Vision],
  (err) => {
    if(err) throw err;

    handlebars(server);
    server.route(routes);
  }
)

// server.auth.strategy('session', 'cookie', 'optional', options);

module.exports = server;
