var express	= require('express');
var path = require('path');
var exphbs  = require('express-handlebars');
var port    = 3000;
var homeRoutes = require('./routes/homeRoutes');

var app = express();

app.engine('handlebars', exphbs({defaultLayout:'base'}));
app.set('view engine', 'handlebars');

app.use('/', homeRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port)

console.log('Server running at http:127.0.0.1:' + port + '/')
