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
  let url = 'https://api.github.com/issues?state=all';
  request.get({url:url, headers:header}, (err, response, body) => {
    let issueData = JSON.parse(body).map(function(a){return [`issue #${a.number}`, a.title, a.state, a.created_at.slice(11,-1)]})
    reply(issueData);
  })
}
};
