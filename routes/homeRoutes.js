var express = require('express');
var querystring = require('querystring')
var request = require('request')
var router = express.Router();

var ACCESS_TOKEN = ''
var CLIENT_ID =	'95f68d4acb7a4d11a6ca524098a24e49'
var CLIENT_SECRET =	'0b7433973f0340508aa266cf6b12636a'
var WEBSITE_URL =	'http://localhost:3000'
var REDIRECT_URI =	'http://localhost:3000/auth/finalize'

router.get('/', function(req, res){
  res.render('home', {
    title:'Googlegram+'
  })
});

router.post('/', function(req, res){
  var authorize = {
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code'
  }
  //https://api.instagram.com/oauth/authorize/?client_id=CLIENT-ID&redirect_uri=REDIRECT-URI&response_type=code
  var uri = 'https://api.instagram.com/oauth/authorize/?' + querystring.stringify(authorize)
  res.redirect(uri)
});

router.get('/auth/finalize', function(req, res){
  var post_data = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code',
      code: req.query.code
  }

  var options = {
    url: 'https://api.instagram.com/oauth/access_token',
    form: post_data
  }

  request.post(options, function(error, response, body) {
    var data = JSON.parse(body)
    ACCESS_TOKEN = data.access_token
    res.redirect('/dashboard')
  })
})

module.exports = router
