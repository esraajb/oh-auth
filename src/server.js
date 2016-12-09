const Hapi = require('hapi');
const Inert = require('inert');
const env = require('env2')('./config.env');
const Vision = require('vision');
const routes = require('./routes.js');
const HapiAuthJWT2 = require('hapi-auth-jwt2');
const jwt = require('jsonwebtoken');
const server = new Hapi.Server();
const userQuery = require('./dbRequests/getUser.js');
server.connection({
  port: process.env.PORT || 4000
});

var validate = function(token, request,callback){
  console.log('Calling the validate function');
  console.log(token.user.user_id);
    userQuery((err, data) => {
      if (err) { throw err; }
      console.log(data);
      if (data){
        return callback(null,true)
      }else{
        return callback(null,false)
      }
    }, token.user.user_id);
}

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
