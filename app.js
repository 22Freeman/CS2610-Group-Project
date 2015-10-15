var express	= require('express');
var port    = 3000;
var exphbs  = require('express-handlebars');
var app = express();

app.engine('handlebars', exphbs({defaultLayout:'base'}));
app.set('view engine', 'handlebars');

function home(req, res) {
  res.render('home', {
    title:'Title',
    welcome:'welcome'
  }
)}

//routes
app.get('/', home);

app.listen(port)

console.log('Server running at http:127.0.0.1:' + port + '/')
