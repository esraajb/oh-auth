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
        created_at: new Date(a.created_at),
        closed_at: new Date(a.closed_at),
        velocity: (a.state === 'open'? null : velocity(a.closed_at,a.created_at))
      }
    });
    reply.view('user_issues', {issueData})

    function velocity(endDate,startDate){
      var end = new Date(endDate).getTime();
      var start = new Date(startDate).getTime();
      var milliseconds = end-start;
      var seconds = (milliseconds / 1000) % 60 ;
      var minutes =  Math.floor((milliseconds / (1000*60)) % 60);
      var hours =  Math.floor((milliseconds / (1000*60*60)) % 24);
      var days = Math.floor((milliseconds / (1000*60*60*24)) % 7);
      var weeks = Math.floor(milliseconds / (1000*60*60*24*7));
      return `${weeks}:${days}:${hours}:${minutes}:${seconds}`;
    }
  })
}
};
