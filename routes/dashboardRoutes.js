var express = require('express');
var router =  express.Router();
var request = require('request')
var bodyParser = require('body-parser')
var cfg = require('../config.js')

router.get('/', function(req, res){
  if (req.session.access_token == undefined)
  {
    res.redirect('/../');
  }
  else
  {
    request({
      url:'https://api.instagram.com/v1/users/self/feed?access_token='+req.session.access_token}, function (error, response, body) {
      if (!error && response.statusCode <= 200) {
          var feed = JSON.parse(body)
        res.render('dashboard', {
          title: 'Googlegram+',
          name: req.session.userSessionInfo,
          feed: feed.data
        });
      }
      else {
        req.session.access_token = undefined
        res.redirect('/')
      }
    })
  }
});

module.exports = router
