var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');

var app = express();

// Setup the routes
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/messages'));
app.use(require('./routes/api'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Login as mike
app.set('logged_in_user', 0);

// import json data files and set users and messages for the current logged_in_user
var users = require('./data/users.json');
var inboxes = require('./data/inboxes.json');
app.set('users', users.users);
app.set('inbox', inboxes.inboxes[app.get('logged_in_user')]);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var server = require('http').createServer(app);
server.listen(app.get('port'), function(){
    console.log('Listening on port ' + app.get('port'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
