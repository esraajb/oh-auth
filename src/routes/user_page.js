module.exports = {
  method:'GET',
  path:'/issues/:all',
  handler: (req, reply) => {
    let header = {
    'User-Agent' : 'oh-auth',
    Authorization: `token ${req.auth.credentials.access_token}`
  }
  let url = 'https://api.github.com'
}
