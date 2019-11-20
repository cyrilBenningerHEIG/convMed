var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//SEEDER CONFIG
const { Seeder } = require('mongo-seeding');
const config = {
  database: 'mongodb://<admin>:<Admin123>@ds047958.mlab.com:47958/heroku_vcpp2jlx',
  dropDatabase: true
};
const seeder = new Seeder(config);
try {
  await seeder.import(collections);
} catch (err) {
  // Handle errors
}
//
const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb://heroku_vcpp2jlx:ioqsf961jnopl2v0u2gd5ujtai@ds047958.mlab.com:47958/heroku_vcpp2jlx');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
