const Request = require('request');

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
  Request.get({url:url, headers:header}, (err, response, body) => {
    let issueData = JSON.parse(body).map(function(a){
      let created = new Date(a.created_at);
      let createdDisplay = created.toString().slice(0,10).concat(new Date(a.created_at).toString().slice(15,24));
      let closed = new Date(a.closed_at);
      let closedDisplay = closed.toString().slice(0,10).concat(new Date(a.created_at).toString().slice(15,24));
      return {
        issue_number: a.number,
        title: a.title,
        state: a.state,
        created_at: createdDisplay,
        closed_at: closedDisplay,
        velocity: (a.state === 'open'? null : velocity(a.closed_at, a.created_at))
      }
    });

    reply.view('user_issues', {issueData})

    function velocity(endDate, startDate){
      let end = new Date(endDate).getTime();
      let start = new Date(startDate).getTime();
      let milliseconds = end-start;
      let seconds = (milliseconds / 1000) % 60 ;
      let minutes =  Math.floor((milliseconds / (1000*60)) % 60);
      let hours =  Math.floor((milliseconds / (1000*60*60)) % 24);
      let days = Math.floor((milliseconds / (1000*60*60*24)) % 7);
      let weeks = Math.floor(milliseconds / (1000*60*60*24*7));
      return (days === 0 && hours === 0) ? `${minutes} mins`
        : (days === 0) ? `${hours} hours, ${minutes} mins`
        : (days === 1) ? `${days} day, ${hours} hours, ${minutes} mins`
        : `${days} days, ${hours} hours, ${minutes} mins`;
    }
  })
}
};
