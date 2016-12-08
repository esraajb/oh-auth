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
    let issueData = JSON.parse(body).map(function(a){
      return {
        issue_number: a.number,
        title: a.title,
        state: a.state,
        created_at: a.created_at,
        closed_at: a.closed_at
      }
    });
    //reply(issueData);
    reply.view('user_issues', {issueData})
  })
}
};
