var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.render('profile', {
    //title:'Googlegram+'
  })
});

module.exports = router
