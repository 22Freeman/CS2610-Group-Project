var express = require('express');
var router = express.Router();
var cfg = require('../config.js')
var Users = require('../models/users')
var querystring = require('querystring')
var bodyParser = require('body-parser')
var request = require('request')
var session = require('express-session')

router.use(bodyParser.urlencoded({extended: false}))

router.use(session({
   cookieName: 'session',
   secret: 'asdfasd;lkjweiovnxc,kmeuinf',
   resave: false,
   saveUninitialized: true
}))

router.get('/', function(req, res){
  if (req.session.access_token == undefined)
  {
  res.redirect('/../');
  }
  else
  {
    res.render('profile', {
      title:'Googlegram+',
      user: req.session.userSessionInfo
    })
  }
});

router.get('/update', function(req,res) {
   if(req.session.userId) {
      Users.find(req.session.userId, function(document) {
         if(!document) return res.redirect('/')
         res.render('profile', {
           title:'Googlegram+',
           user: req.session.userSessionInfo
         })
      })
   }
   else {
      res.redirect('/')
   }
})

router.post('/update', function(req,res) {
   var user = req.body
   user._id = req.session.userId
   console.log(user);
   Users.update(user, function(result) {
     Users.find(req.session.userId, function(document) {
        if(!document) return res.redirect('/')
        res.render('profile', {
          title:'Googlegram+',
          user: document
        })
      })
   })
})

module.exports = router
