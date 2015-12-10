var express	= require('express');
var path = require('path');
var exphbs  = require('express-handlebars');
var port    = 3000;

var dashboardRoutes = require('./routes/dashboardRoutes');
var homeRoutes = require('./routes/homeRoutes');
var profileRoutes = require('./routes/profileRoutes');
var searchRoutes = require('./routes/searchRoutes');

var db = require('./db')

var app = express();

app.engine('handlebars', exphbs({defaultLayout:'base'}));
app.set('view engine', 'handlebars');

app.use('/', homeRoutes);

app.use('/dashboard', dashboardRoutes);

app.use('/profile', profileRoutes);

app.use('/search', searchRoutes);

app.use(express.static(path.join(__dirname, 'public')));

db.connect('mongodb://dbuser:password@ds053964.mongolab.com:53964/cs2610', function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    app.listen(port, function() {
      console.log('Connected to database and listening on port 3000...')
    })
  }
})
