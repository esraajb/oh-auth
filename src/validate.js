
const userQuery = require('./dbRequests/getUser.js');
module.exports = function(token, request,callback){
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
};
