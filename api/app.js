var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var findRemoveSync = require('find-remove');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require("./routes/testAPI");
var emojiblendsRouter = require("./routes/emojiblends");
var randomHexcodesRouter = require("./routes/randomhexcodes");
var randomBlendHexcodesRouter = require("./routes/randomblendhexcodes");
var blendEmojisRouter = require("./routes/blendemojis");
var markovHexcodesRouter = require("./routes/markovhexcodes");


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
app.use("/markovhexcodes", markovHexcodesRouter);

/*
TODO: Move this to markovhexcodes. And find better corpus
*/
const Markov = require('node-markov-generator');
const corpus = ['This is my text.', 'Markov chains are great', 'Yet another string! This is just awesome.'];
//Corpus needs to be bigrams already, generator doesnt seem to get the memo otherwise
const generator = new Markov.TextGenerator(corpus);
const result = generator.generate({
  wordToStart: 'is',
  minWordCount: 1
});
console.log(result);

/*
Delete all emoji blends older than 30 mins, this operation occurs every 5 minutes.
TODO: Replace console output with something more sensible.
*/
setInterval(function(){ 
  const result = findRemoveSync(path.join(__dirname + '/public/blends'), {age: { seconds: 1800 }, extensions: '.png' });
  if(Object.keys(result).length < 0){
    console.log('Ah yes "' + result + '", we have dismissed that data.');
  }
}, 300000);

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
