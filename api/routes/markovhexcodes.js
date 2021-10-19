var express = require("express");
var router = express.Router();
var path = require('path');
var parseString = require('xml2js').parseString;
const fs = require('fs');
const openmoji = require('openmoji');
const Markov = require('node-markov-generator');

var corpus = fs.readFileSync('corpus.txt').toString().split(",");
var generator = new Markov.TextGenerator(corpus);

/*
TODO: 
*/
function isEmoji(word) {
  const resultAnnotation = openmoji.openmojis.find(({ annotation }) => annotation === word);
  if (resultAnnotation !== undefined) {
      return true;
  }
  else{
    const resultTags = openmoji.openmojis.find(({ tags }) => tags === word);
    if (resultTags !== undefined) {
        return true;
    }
    else{
      return false;
    }  
  }
}

/*
Gets the hexcode of an emoji based on it's annotation
*/
function getHexcode(word) {
  var result = openmoji.openmojis.find(({ annotation }) => annotation === word);
  //console.log("Result returned, ", result.hexcode);
  if (result !== undefined) {
    return result.hexcode;
}
  result = openmoji.openmojis.find(({ tags }) => tags === word);
  //console.log("Result: ", result);
  if (result !== undefined) {
    return result.hexcode;
  }
  else{
    return -1;
  }
}

function getAnnotation(hex) {
  const result = openmoji.openmojis.find(({ hexcode }) => hexcode === hex);
  if (result.annotation.length > 0) {
    if (Array.isArray(result.annotation)) {
      return result.annotation[0];
    } else {
      return result.annotation;
    }
  }
  return -1;
}

/*
TODO: Update with markov chains
*/
function generateEmojis(num, startEmoji) {
  var numEmojis = num; //113; //id 56 is the center
  let words = [];
  let emojis = [];

  try {

    var startEmojiWords = [startEmoji];

      if (startEmoji.includes(' ')) {
        startEmojiWords = startEmojiWords.concat(startEmoji.split(' '));
      }
      startEmojiWords.forEach(emojiWord => {
        console.log(emojiWord);
        do {
          var complete = false;
          var markovWords = generator.generate({
            wordToStart: emojiWord,
            minWordCount: 1
          });
          var tokens = generator.wordStorage.get(emojiWord);
          if(tokens !== undefined){
            console.dir(tokens.values);
          }
          //console.dir("found: " + str);
          if (typeof markovWords !== undefined && markovWords[1] !== undefined && words.includes(markovWords[1])  === false) { //If word has been returned
            words.push(markovWords[1]);
          }
          else{
            complete = true;
          }  
        } while (markovWords !== undefined && !complete);    
      });
    for (let index = 0; index < words.length; index++) {
      var hex = getHexcode(words[index]);
      if(hex !== -1 && emojis.length < num){
        emojis.push(hex);
      }
    }

  } catch (error) {
    console.log("Markov error", error);
  }
  console.log("Words: ", words);

  //If emoji array is still not long enough, fill with random emoji:
  while (emojis.length < num) {
    var r = Math.floor(Math.random() * (openmoji.openmojis.length - 1));
    var rHex = openmoji.openmojis[r].hexcode;
    if(emojis.indexOf(rHex) === -1) emojis.push(rHex);
  }

  // if (emojis.length < num) {
  //   for (let i = emojis.length; i < num; i++) {
  //     emojis.push('1F436');
  //   }
  // }
  console.log("Emojis: ", emojis);

  return emojis;
}

/*
*/
router.get("/:emojihex", function (req, res, next) {
  var hexcode = req.params.emojihex
  var limit = req.query.limit;

  var emojiName = getAnnotation(hexcode);
  console.log("Starter emoji ID'd as: " + emojiName);
  randomEmojis = generateEmojis(limit, emojiName);

  var jsonEmojis = JSON.stringify(randomEmojis);
  res.json(jsonEmojis);
});


module.exports = router;