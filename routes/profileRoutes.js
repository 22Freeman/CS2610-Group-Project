var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  if (ACCESS_TOKEN == "")
  {
  res.redirect('/../');
  }
  else
  {
  res.render('profile', {
    title:'Googlegram+',
    user: username
  })
}
});

module.exports = router
