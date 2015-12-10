var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser')
var Users = require('../models/users')

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', function(req, res){
  if (req.session.access_token == undefined)
  {
    res.redirect('/../');
  }
  else
  {
    var term = req.body.tag;
    if (term)
    {
      request({
        url:'https://api.instagram.com/v1/tags/'+term+'/media/recent?access_token='+req.session.access_token}, function (error, response, body) {
        if (!error && response.statusCode <= 200) {
          var info = JSON.parse(body)
              Users.find(req.session.userId, function(document) {
              if (!document) return res.redirect('/')
              //Render the update view
              res.render('search', {
                title:'Googlegram+',
                tagName: term,
                name: req.session.userSessionInfo,
                user: document,
                feed: info.data
              })
            });
        }
        else {
          req.session.access_token = undefined
          res.redirect('/')
        }
      })
    }
    else {
      Users.find(req.session.userId, function(document) {
      if (!document) return res.redirect('/')
      //Render the update view
      res.render('search', {
        title:'Googlegram+',
        name: req.session.userSessionInfo,
        user: document
      })
    })
    }
  }
});

router.post('/',function(req,res){
  var term = req.body.tag;
  request({
    url:'https://api.instagram.com/v1/tags/'+term+'/media/recent?access_token='+req.session.access_token}, function (error, response, body) {
    if (!error && response.statusCode <= 200) {
      info = JSON.parse(body)
          Users.find(req.session.userId, function(document) {
          if (!document) return res.redirect('/')
          //Render the update view
          res.render('search', {
            title:'Googlegram+',
            tagName: term,
            name: req.session.userSessionInfo,
            user: document,
            feed: info.data
          })
        });
    }
    else {
      req.session.access_token = undefined
      res.redirect('/')
    }
  })
});

router.post('/tag/add', function(req, res) {
  var tag = req.body.tag;
  console.log('Tag is ' + tag)
  var userId = req.session.userId
  //Add the tag to the user
  Users.addTag(userId, tag, function() {
      Users.find(req.session.userId, function(document) {
      if (!document) return res.redirect('/')
      //Render the update view
      res.render('search', {
        title:'Googlegram+',
        tagName: tag,
        name: req.session.userSessionInfo,
        user: document,
        feed: info.data
      })
    });
  })
})

router.post('/tag/remove', function(req, res) {
  var tag = req.body.tag
  var userId = req.session.userId
  //Add the tag to the user
  Users.removeTag(userId, tag, function() {
    Users.find(req.session.userId, function(document) {
    if (!document) return res.redirect('/')
    //Render the update view
    res.render('search', {
      title:'Googlegram+',
      tagName: tag,
      name: req.session.userSessionInfo,
      user: document,
      feed: info.data
    })
  });
  })
})

module.exports = router
