const Request = require('request');
const Querystring = require('querystring');
const jwt = require('jsonwebtoken');
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
      let token = Querystring.parse(body);
      let  header = {
            'User-Agent': 'oh_auth',
            Authorization: `token ${token.access_token}`
      };
      let  url = `https://api.github.com/user`;
      Request.get({url:url, headers:header}, function (error, response, body) {
      const secret = process.env.SECRET;
      body =JSON.parse(body);
       let payload = {
         'user': {
           'username': body.login,
           'img_url': body.avatar_url,
           'user_id': body.id
         },
         'accessToken': token.access_token
       };
       console.log('payload',payload);
       let options={
        'algorithm': 'HS256',
        'expiresIn': Date.now() + 24 * 60 * 60 * 1000,
        'subject': 'github-data'
      }
       jwt.sign(payload,secret,options, (err,token) => {
        console.log(token);
        console.log('decoded token',jwt.verify(token, process.env.SECRET));
        reply
          .redirect('/issues')
          .state('token', token,
            {path: '/',
            isHttpOnly: false,
            isSecure: process.env.NODE_ENV === 'PRODUCTION' });
      });

    });
  });
}
};

module.exports = results;
