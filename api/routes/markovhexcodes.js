var express = require("express");
var router = express.Router();

const openmoji = require('openmoji');
const Markov = require('node-markov-generator');
const corpus = ['This is my text.', 'Markov chains are great', 'Yet another string! This is just awesome.'];

function setupMarkov() {
  const generator = new Markov.TextGenerator(corpus);
  const result = generator.generate({
    wordToStart: 'is',
    minWordCount: 1
  });
  console.log(result);
}
/*
TODO: Update with markov chains
*/
function generateEmojis(num) {
  /*
  Old code below.
  TODO: Update with markov chains
  */
  var numEmojis = num; //113; //id 56 is the center

  let numbers = [];
  let emojis = [];

  while (numbers.length < numEmojis) {
    var r = Math.floor(Math.random() * (openmoji.openmojis.length - 1));
    if (numbers.indexOf(r) === -1) numbers.push(r);
  }

  for (let index = 0; index < numbers.length; index++) {
    emojis.push(openmoji.openmojis[numbers[index]].hexcode);
  }

  return emojis;
}

/*
*/
router.get("/", function (req, res, next) {
  var limit = req.query.limit;
  randomEmojis = generateEmojis(limit);
  var jsonEmojis = JSON.stringify(randomEmojis);
  res.json(jsonEmojis);
});


module.exports = router;