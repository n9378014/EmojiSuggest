var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var findRemoveSync = require('find-remove');
const emojiGen = require('./models/emojigenerators');

var indexRouter = require('./routes/index');
//var emojiblendsRouter = require("./routes/emojiblends");
var randomHexcodesRouter = require("./routes/randomhexcodes");
var randomBlendHexcodesRouter = require("./routes/randomblendhexcodes");
var blendEmojisRouter = require("./routes/blendemojis");
var markovHexcodesRouter = require("./routes/markovhexcodes");
var markovBlendHexcodesRouter = require("./routes/markovblendhexcodes");
var varietyRouter = require("./routes/variety");

var app = express();

var whitelist = ['http://localhost:3000', 'http://localhost', 'http://3.21.207.179:3000', 'http://3.21.207.179']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(express.static(path.resolve(__dirname, '../client/build')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/blends', express.static(__dirname + '/public'), cors(corsOptions));
app.use("/api/blendemojis", blendEmojisRouter, cors(corsOptions));
app.use("/api/randomhexcodes", randomHexcodesRouter, cors(corsOptions));
app.use("/api/randomblendhexcodes", randomBlendHexcodesRouter, cors(corsOptions));
app.use("/api/markovhexcodes", markovHexcodesRouter, cors(corsOptions));
app.use("/api/markovblendhexcodes", markovBlendHexcodesRouter, cors(corsOptions));
app.use("/api/variety", varietyRouter, cors(corsOptions));
//app.use("/api/emojiblends", emojiblendsRouter, cors(corsOptions));

// const deleted = findRemoveSync(path.join(__dirname + '/public/blends'), {extensions: '.png' });
// if(Object.keys(deleted).length < 0){
//   console.log('The following files have been deleted: ' + deleted);
// }

/*
Practice with conceptnet.
*/
// emojiGen.cohyponymEmojis(10, '1F415', function (emojisss) {
//     console.log('Wordnet blend:' + emojisss);
//   });
/*
Delete all emoji blends older than 30 mins, this operation occurs every 5 minutes.
*/
setInterval(function(){ 
  const result = findRemoveSync(path.join(__dirname + '/public/blends'), {age: { seconds: 1800 }, extensions: '.png' });
  if(Object.keys(result).length < 0){
    console.log('The following files have been deleted: ' + result);
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
