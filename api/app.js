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
var blendManyEmojisRouter = require("./routes/blendmanyemojis");
var markovHexcodesRouter = require("./routes/markovhexcodes");

var app = express();

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors(corsOptions));
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
app.use("/blendmanyemojis", blendManyEmojisRouter);
app.use('/blends', express.static(__dirname + '/public'));
app.use("/markovhexcodes", markovHexcodesRouter);

/*
TODO: Move this to markovhexcodes. And find better corpus
*/
const Markov = require('node-markov-generator');
const corpusPath = path.join(__dirname, 'routes/test.txt');
//const corpus = ['This is my text.', 'Markov chains are great', 'Yet another string! This is just awesome.'];
//Corpus needs to be bigrams already, generator doesnt seem to get the memo otherwise
const generator = new Markov.TextGenerator(corpusPath);
const result = generator.generate({
  wordToStart: 'thor',
  minWordCount: 1,
  maxWordCount: 1
});
console.log(result);
// const MarkovChain = require('markov-chain-generator');
// const markovChain = new MarkovChain('Fourscore and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal. Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived and so dedicated, can long endure. We are met on a great battle-field of that war. We have come to dedicate a portion of that field, as a final resting place for those who here gave their lives that that nation might live. It is altogether fitting and proper that we should do this. But, in a larger sense, we can not dedicate-we can not consecrate-we can not hallow-this ground. The brave men, living and dead, who struggled here, have consecrated it, far above our poor power to add or detract. The world will little note, nor long remember what we say here, but it can never forget what they did here. It is for us the living, rather, to be dedicated here to the unfinished work which they who fought here have thus far so nobly advanced. It is rather for us to be here dedicated to the great task remaining before us-that from these honored dead we take increased devotion to that cause for which they gave the last full measure of devotion-that we here highly resolve that these dead shall not have died in vain-that this nation, under God, shall have a new birth of freedom-and that government of the people, by the people, for the people shall not perish from the earth.');
// console.log(markovChain.generate(null, 5));

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
