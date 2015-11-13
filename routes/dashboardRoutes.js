var express = require('express');
var router =  express.Router();
var request = require('request')
var bodyParser = require('body-parser')

router.get('/', function(req, res){
  if (ACCESS_TOKEN == "")
  {
  res.redirect('/../');
  }
  else
  {
    res.render('dashboard', {
      title:'Googlegram+',
      name: username
    })
  }
});

router.post('/',function(req,res){
  request({
    url:'https://api.instagram.com/v1/users/self/feed?access_token='+ACCESS_TOKEN}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var feed = JSON.parse(body)
      res.render('dashboard', {
        title: 'Googlegram+',
        name: username,
        URL1: feed.data.images.standard_resolution.url,
        URL2: feed.data.images.standard_resolution.url,
        URL3: feed.data.images.standard_resolution.url,
        URL4: feed.data.images.standard_resolution.url,
        URL5: feed.data.images.standard_resolution.url,
        URL6: feed.data.images.standard_resolution.url,
        link1: feed.data.link,
        link2: feed.data.link,
        link3: feed.data.link,
        link4: feed.data.link,
        link5: feed.data.link,
        link6: feed.data.link,
        likes1: feed.data.likes.count,
        likes2: feed.data.likes.count,
        likes3: feed.data.likes.count,
        likes4: feed.data.likes.count,
        likes5: feed.data.likes.count,
        likes6: feed.data.likes.count,
        comments1: feed.data.comments.count,
        comments2: feed.data.comments.count,
        comments3: feed.data.comments.count,
        comments4: feed.data.comments.count,
        comments5: feed.data.comments.count,
        comments6: feed.data.comments.count,


      });
    }
  })
});

module.exports = router
