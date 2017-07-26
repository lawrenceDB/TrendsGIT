var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var register = require('./routes/register');

var app = express();
var server = require('http').Server(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/register', register);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//MySQL Connection
var mysql = require('mysql');
var connection = mysql.createConnection({
	host	 : 'localhost',
	user	 : 'root',
	password : '',
	database : 'dbdlsl'
});

connection.connect(function(err){
	if (err) {
		console.error('ERROR CONNECTING: ' + err.stack);
		return;
	}

	console.log('Connected as id: ' + connection.threadId);
 });

 connection.query('SELECT * FROM tblcredentials', function(err, rows, fields){
 if(!err)
 	console.log('The solution is: ', rows);
 else 	
 	console.log('Error while performing Query.');
});

connection.end();

module.exports = app;
server.listen('1001');
console.log('Project Running at port 1001');