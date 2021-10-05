var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require("./routes/testAPI");
var emojiblendsRouter = require("./routes/emojiblends");
var randomHexcodesRouter = require("./routes/randomhexcodes");
var randomBlendHexcodesRouter = require("./routes/randomblendhexcodes");
var blendEmojisRouter = require("./routes/blendemojis");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/testAPI", testAPIRouter);
app.use("/emojiblends", emojiblendsRouter);
app.use("/randomhexcodes", randomHexcodesRouter);
app.use("/randomblendhexcodes", randomBlendHexcodesRouter);
app.use("/blendemojis", blendEmojisRouter);
app.use('/blends', express.static(__dirname + '/public'));

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
