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
TODO: 
*/
function isEmoji(word) {
  const result = openmoji.openmojis.find(({ annotation }) => annotation === word);
  if(result.length > 0){
    return true;
  }
  return false;
}

/*
TODO: 
*/
function getHexcode(word) {
  const result = openmoji.openmojis.find(({ annotation }) => annotation === word);
  if(result.length > 0){
    return result[0];
  }
  return -1;
}

/*
TODO: Update with markov chains
*/
function generateEmojis(num, startEmoji) {
  /*
  TODO: Update with markov chains
  */
  var numEmojis = num; //113; //id 56 is the center

  let words = [];
  let emojis = [];
  try {
    while (words.length < numEmojis) {
      var startWord = 'dinosaur'; //TODO: replace with startEmoji tag or other descriptor
      var word = generator.generate({
        wordToStart: startWord,
        minWordCount: 1,
        maxWordCount: 1
      });
      if (isEmoji(word) && words.indexOf(word) === -1) words.push(word); //If word is an emoji and isn't already in words, put it there
    }
  
    for (let index = 0; index < words.length; index++) {
      emojis.push(getHexcode(words[index]).hexcode);
    }  
  } catch (error) {
    for (let index = 0; index < num; index++) {
      emojis.push('1F4A9');
    }  
  }
  return emojis;
}

/*
*/
router.get("/:emojihex", function (req, res, next) {
  console.log('HEELP');
  var hexcode = req.params.emojihex
  var limit = req.query.limit;
  randomEmojis = generateEmojis(limit, hexcode);
  var jsonEmojis = JSON.stringify(randomEmojis);
  res.json(jsonEmojis);
});


module.exports = router;