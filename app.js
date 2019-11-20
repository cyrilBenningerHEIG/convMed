var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const Response = require('../models/response');


//
const mongoose = require('mongoose');
mongoose.Promise = Promise;

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

///////
new Response({
  nom : "Q1", 
  photo_response : "https://static.lexpress.fr/medias_12024/w_2048,h_1146,c_crop,x_0,y_17/w_480,h_270,c_fill,g_north/v1563812176/l-adolescente-suedoise-greta-thunberg-manifeste-pour-le-climat-a-hambourg-le-1er-mars-2019_6156620.jpg",
  text_question : "Vous ne parlez que d'aller de l'avant avec les mêmes mauvaises idées qui nous ont mis dans ce pétrin, même si la seule chose raisonnable à faire est de tirer le frein à main.", 
  info : "C'est une citation tirée du discours percutant de Greta Thunberg qui fait face aux plus grands hommes politiques lors d'un sommet de l'ONU, où elle dénonce les inactions des dirigeants. " 
  })
  .save();

module.exports = app;
