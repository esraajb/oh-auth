const Hapi = require('hapi');
const Inert = require('inert');
const env = require('env2')('./config.env');
const Vision = require('vision');
const routes = require('./routes.js');
//const handlebars = require('./configure_handlebars')
const HapiAuthJWT2 = require('hapi-auth-jwt2');
const jwt = require('jsonwebtoken');
const server = new Hapi.Server();

server.connection({
  port: process.env.PORT || 4000
});
// Store the users somewhere!!!!!
var users = {
  '18500240': { username: 'denesnori',
  img_url: 'https://avatars.githubusercontent.com/u/18500240?v=3',
  user_id: 18500240 },
  '18164707':
   { username: 'RhodesPeter',
     img_url: 'https://avatars.githubusercontent.com/u/18164707?v=3',
     user_id: 18164707 }
}
/// rewrite users soon!!!
var validate = function(token, request,callback){
  console.log('Calling the validate function');
//  let decoded = jwt.verify(token, process.env.SECRET);
  if (users[token.user.user_id]){
    return callback(null,true)
  }else{
    return callback(null,false)
  }
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
