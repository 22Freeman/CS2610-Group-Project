var express = require('express')
var querystring = require('querystring')
var request = require('request')
var session = require('express-session')
var router = express.Router();
var cfg = require('../config.js')

router.use(session({
  cookieName: 'session',
  secret: 'asdfasd;lkjweiovnxc,kmeuinf',
  resave: false,
  saveUninitialized: true
}))

/*router.use(function(req, res) {
  if(req.session.access_token !== "")
  {
    console.log(access_token)
  }
})*/

router.get('/', function(req, res){

    res.render('home', {
      title:'Googlegram+'
    })
});

router.post('/', function(req, res){
  var authorize = {
    client_id: cfg.client_id,
    redirect_uri: cfg.redirect_uri,
    response_type: 'code'
  }
  //https://api.instagram.com/oauth/authorize/?client_id=CLIENT-ID&redirect_uri=REDIRECT-URI&response_type=code
  var uri = 'https://api.instagram.com/oauth/authorize/?' + querystring.stringify(authorize)
  res.redirect(uri)
});

router.get('/auth/finalize', function(req, res){
  var post_data = {
      client_id: cfg.client_id,
      client_secret: cfg.client_secret,
      redirect_uri: cfg.redirect_uri,
      grant_type: 'authorization_code',
      code: req.query.code
  }

  var options = {
    uri: 'https://api.instagram.com/oauth/access_token',
    form: post_data
  }

  request.post(options, function(error, response, body) {
    data = JSON.parse(body)
    req.session.access_token = data.access_token
    global.username = data.user.username
    res.redirect('/dashboard') //switch this back to dashboard
  })
})

module.exports = router
