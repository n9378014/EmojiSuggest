var express = require("express");
var router = express.Router();

const openmoji = require('openmoji');
const Markov = require('node-markov-generator');
const corpus = ['This is my text.', 'Markov chains are great', 'Yet another string! This is just awesome.'];
const generator = new Markov.TextGenerator(corpus);

function setupMarkov() {
  const result = generator.generate({
    wordToStart: 'is',
    minWordCount: 1
  });
  console.log(result);
}
/*
TODO: Update with markov chains
*/
function generateEmojis(num, startEmoji) {
  /*
  Old code below.
  TODO: Update with markov chains
  */
  var numEmojis = num; //113; //id 56 is the center

  let words = [];
  let emojis = [];

  while (words.length < numEmojis) {
    var startWord = 'dinosaur'; //TODO: replace with startEmoji tag or other descriptor
    var word = generator.generate({
      wordToStart: startWord,
      minWordCount: 1,
      maxWordCount: 1
    });
    if (words.indexOf(word) === -1) words.push(word);
  }

  for (let index = 0; index < words.length; index++) {
    //emojis.push(openmoji.openmojis[words[index]].hexcode); //TODO: Push emoji hexcode
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