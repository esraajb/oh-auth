const Hapi = require('hapi');
const Inert = require('inert');
const env = require('env2')('../oh-auth/config.env');
const Vision = require('vision');
const routes = require('./routes.js');
const server = new Hapi.Server();

server.connection({
  port: process.env.PORT || 4000
});

server.register([Inert,Vision],
  (err) => {
    if(err) throw err;
     server.route(routes);
  }
)

module.exports = server;
