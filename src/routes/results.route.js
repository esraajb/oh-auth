const Request = require('request');

const results ={
  method: 'GET',
  path: '/results',
  handler: (request,reply) => {
    let query ={
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code: request.url.query.code
    }
    Request.post({url:'https://github.com/login/oauth/access_token' , form: query }, (err,res,body) =>{
      if (err) throw err;
      reply(body);
    })
  }
}

module.exports = results;
