var express = require('express');
var router = express.Router();

function home(req, res)
{
  res.render('home', {
    title:'Googlegram+',
    javascript:'/html/home/login.js',
    stylesheet:'/html/home/login.css'
  })
}

router.get('/', home);

module.exports = router
