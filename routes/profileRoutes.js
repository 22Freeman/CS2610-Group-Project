var express = require('express');
var router = express.Router();

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

module.exports = router
