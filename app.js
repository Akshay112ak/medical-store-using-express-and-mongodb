var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var db = require('./database/db');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var homeRouter = require('./routes/home');
var AddproductRouter=require('./routes/addproduct')
var backRouter=require('./routes/bak')
var viewproductRouter=require('./routes/viewproduct');
var updateproductRouter=require('./routes/updateproduct')
var deleteproductrouter=require('./routes/deleteproduct')
var searchProductRouter=require('./routes/searchproduct')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session middleware setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'default-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set secure to true if using HTTPS
}));


// route definitions
app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/', loginRouter);
app.use('/', signupRouter);
app.use('/', homeRouter);
app.use('/',AddproductRouter);
app.use('/',backRouter);
app.use('/',viewproductRouter);
app.use('/',updateproductRouter);
app.use('/',deleteproductrouter);
app.use('/',searchProductRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
