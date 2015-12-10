var express = require('express')
var querystring = require('querystring')
var request = require('request')
var session = require('express-session')
var router = express.Router();
var cfg = require('../config.js')
var Users = require('../models/users')

router.use(session({
  cookieName: 'session',
  secret: 'asdfasd;lkjweiovnxc,kmeuinf',
  resave: false,
  saveUninitialized: true
}))

router.get('/', function(req, res){
    if(req.session.access_token == undefined)
    {
      res.render('home', {
        title:'Googlegram+'
      })
    }
    else {
      res.redirect('/dashboard')
    }
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
    var user = data.user
    if(data.access_token == undefined)
    {
      res.redirect('/')
    }
    else
    {
      req.session.access_token = data.access_token
      req.session.userSessionInfo = data.user
      req.session.userId = data.user.id


      user._id = user.id
      delete user.id

       Users.find(user._id, function(document) {
         if (!document) {
           Users.insert(user, function(result) {
             res.redirect('/dashboard')
           })
         } else {
           res.redirect('/dashboard')
         }
       })

      //res.redirect('/dashboard') //switch this back to dashboard
    }
  })
})

// production error handler
// no stacktraces leaked to user
router.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err,
        error: {}
    });
});

module.exports = router
