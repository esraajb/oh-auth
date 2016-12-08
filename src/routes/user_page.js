const request = require('request');

module.exports = {
  method:'GET',
  path:'/issues',
  config: {auth: 'jwt'},
  handler: (req, reply) => {
    let header = {
    'User-Agent' : 'oh-auth',
    Authorization: `token ${req.auth.credentials.accessToken}`
  }
  let url = 'https://api.github.com/user/issues';//?state=all';
  request.get({url:url, headers:header}, (err, response, body) => {
    reply(JSON.parse(body).length);
  })
}
};
