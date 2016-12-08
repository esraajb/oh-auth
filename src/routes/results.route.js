const Request = require('request');
const Querystring = require('querystring');
const jwt = require('jsonwebtoken');

const results = {
  method: 'GET',
  path: '/results',
  handler: (req,reply) => {
    let url = 'https://github.com/login/oauth/access_token'
    let header = {
      accept: 'application/json'
    }
    let query = {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code: req.url.query.code
    }
    Request.post({url:url, headers:header, form:query }, (err,res,body) => {
      if (err) throw err;
      if (res.statusCode === 200) {
        let token = Querystring.parse(body);
        let header = {
          'User-Agent': 'oh_auth',
          Authorization: `token ${token.access_token}`
        };
        let url = `https://api.github.com/user`;

        Request.get({url:url, headers:header}, function (error, response, body) {
          if (error) throw error;
          if (response.statusCode !== 200) console.log('Error, status code is: ', response.statusCode);
          if (response.statusCode === 200) {
            console.log('Response: ', response.statusCode);
            const secret = process.env.SECRET;
            body = JSON.parse(body);
            let payload = {
              'user': {
                'username': body.login,
                'img_url': body.avatar_url,
                'user_id': body.id
              },
              'accessToken': token.access_token
            };
            //  let options = {
            //    'typ': 'JWT',
            //    'sub': 'github-data',
            //    'exp': Date.now() + 24 * 60 * 60 * 1000,
            //    'iat': Date.now(),
            //    "alg": "HS256"
            //  };
            let options2 = {
              'algorithm': 'HS256',
              'expiresIn': Date.now() + 24 * 60 * 60 * 1000,
              'subject': 'github-data'
            }
            jwt.sign(payload,secret,options2, (err,token) => {
              console.log('Token: ', token);
            });
            reply(payload);
          });
        }
      }
    });
  }
};

module.exports = results;
