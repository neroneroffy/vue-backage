var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var member = require('./routes/member');
var resource = require('./routes/resource');
var role = require('./routes/role');
var authInfo = require('./routes/auth');
var charts = require('./routes/charts');
var commodity = require('./routes/commodity');

//连接mongodb数据库
let mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/vue-db';
mongoose.connect(DB_URL);
mongoose.connection.on('connected',()=>{
  console.log('mongodb已经连接')
});
mongoose.connection.on('disconnected',()=>{
  console.log('mongodb已断开连接')
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/auth', member);
app.use('/resource', resource);
app.use('/role', role);
app.use('/authinfo', authInfo);
app.use('/charts', charts);
app.use('/commodity', commodity);

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

module.exports = app;
