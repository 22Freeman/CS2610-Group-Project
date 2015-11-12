var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser')

router.get('/', function(req, res){
  if (ACCESS_TOKEN == "")
  {
  res.redirect('/../');
  }
  else
  {
    res.render('search', {
      title:'Googlegram+',
      name: username
    })
  }

});

router.use(bodyParser.urlencoded({ extended: false }));
router.post('/',function(req,res){
  var term = req.body.tag;
  request({
    url:'https://api.instagram.com/v1/tags/'+term+'/media/recent?access_token='+ACCESS_TOKEN}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body)
      res.render('search', {
        title: 'Googlegram+',
        tagName: term,
        name: username,
        imgURL1: info.data[0].images.standard_resolution.url,
        imgURL2: info.data[1].images.standard_resolution.url,
        imgURL3: info.data[2].images.standard_resolution.url,
        imgURL4: info.data[3].images.standard_resolution.url,
        imgURL5: info.data[4].images.standard_resolution.url,
        imgURL6: info.data[5].images.standard_resolution.url,
        imgURL7: info.data[6].images.standard_resolution.url,
        imgURL8: info.data[7].images.standard_resolution.url,
        imgURL9: info.data[8].images.standard_resolution.url,
        link1: info.data[0].link,
        link2: info.data[1].link,
        link3: info.data[2].link,
        link4: info.data[3].link,
        link5: info.data[4].link,
        link6: info.data[5].link,
        link7: info.data[6].link,
        link8: info.data[7].link,
        link9: info.data[8].link,
        likes1: info.data[0].likes.count,
        likes2: info.data[1].likes.count,
        likes3: info.data[2].likes.count,
        likes4: info.data[3].likes.count,
        likes5: info.data[4].likes.count,
        likes6: info.data[5].likes.count,
        likes7: info.data[6].likes.count,
        likes8: info.data[7].likes.count,
        likes9: info.data[8].likes.count,
        comments1: info.data[0].comments.count,
        comments2: info.data[1].comments.count,
        comments3: info.data[2].comments.count,
        comments4: info.data[3].comments.count,
        comments5: info.data[4].comments.count,
        comments6: info.data[5].comments.count,
        comments7: info.data[6].comments.count,
        comments8: info.data[7].comments.count,
        comments9: info.data[8].comments.count,
      });
    }
  })
});


module.exports = router
