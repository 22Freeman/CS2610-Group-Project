var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser')

router.get('/', function(req, res){
  if (req.session.access_token == undefined)
  {
    res.redirect('/../');
  }
  else
  {
    res.render('search', {
      title:'Googlegram+',
      name: req.session.userSessionInfo
    })
  }
});

router.use(bodyParser.urlencoded({ extended: false }));
router.post('/',function(req,res){
  var term = req.body.tag;
  request({
    url:'https://api.instagram.com/v1/tags/'+term+'/media/recent?access_token='+req.session.access_token}, function (error, response, body) {
    if (!error && response.statusCode <= 200) {
      var info = JSON.parse(body)
      res.render('search', {
        title: 'Googlegram+',
        tagName: term,
        name: req.session.userSessionInfo,
        feed: info.data
      });
    }
    else {
      req.session.access_token = undefined
      res.redirect('/')
    }
  })
});


module.exports = router
