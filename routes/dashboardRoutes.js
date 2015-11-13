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
  request({
    url:'https://api.instagram.com/v1/users/self/feed?access_token='+ACCESS_TOKEN}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var feed = JSON.parse(body)
      res.render('dashboard', {
        title: 'Googlegram+',
        name: username,
        URL1: feed.data[0].images.standard_resolution.url,
        URL2: feed.data[1].images.standard_resolution.url,
        URL3: feed.data[2].images.standard_resolution.url,
        URL4: feed.data[3].images.standard_resolution.url,
        URL5: feed.data[4].images.standard_resolution.url,
        URL6: feed.data[5].images.standard_resolution.url,
        link1: feed.data[0].link,
        link2: feed.data[1].link,
        link3: feed.data[2].link,
        link4: feed.data[3].link,
        link5: feed.data[4].link,
        link6: feed.data[5].link,
        likes1: feed.data[0].likes.count,
        likes2: feed.data[1].likes.count,
        likes3: feed.data[2].likes.count,
        likes4: feed.data[3].likes.count,
        likes5: feed.data[4].likes.count,
        likes6: feed.data[5].likes.count,
        comments1: feed.data[0].comments.count,
        comments2: feed.data[1].comments.count,
        comments3: feed.data[2].comments.count,
        comments4: feed.data[3].comments.count,
        comments5: feed.data[4].comments.count,
        comments6: feed.data[5].comments.count,
      });
    }
  })

}
});
module.exports = router
