var express = require("express");
var router = express.Router();
var path = require('path');
var parseString = require('xml2js').parseString;
const fs = require('fs');
const openmoji = require('openmoji');
const Markov = require('node-markov-generator');
//const corpus = ['This is my text.', 'Markov chains are great', 'Yet another string! This is just awesome.'];

var corpus = [];
var generator = new Markov.TextGenerator(corpus);

//TODO: Make this happen for each file in the corpus:
fs.readFile('test.xml', function (err, data) {
  console.log("Corpus: ", corpus); //Completed adding this document to corpus
  parseString(data, function (err, result) {
    console.dir(result.document.s[0].w[5]._); //5th word of the 0th sentence
    result.document.s.forEach(sentence => { //For each sentence in document
      var strSentence = "";
      sentence.w.forEach(word => { //For each word in sentence
        if (isEmoji(word._) === true) { //If word can be found in OpenMoji
          strSentence = strSentence.concat(word._ + ' ');
        }
      });
      //console.log(strSentence.split(' '));
      var arrSentence = strSentence.substring(0, strSentence.length - 1).split(' ');
      if(arrSentence.length - 1 > 1){
        arrSentence = arrSentence.flatMap((x) => {
          return arrSentence.flatMap((y) => {
            return (x != y) ? [[x,y]] : []
          });
        });
        //corpus.push(strSentence.substring(0, strSentence.length - 1)); //Add sentence to corpus
        if(arrSentence.length > 0){
          arrSentence.forEach(ngram => {
            corpus.push(ngram[0].concat(' ', ngram[1]));
          });
        }
      }
    });
    console.log("Corpus: ", corpus); //Completed adding this document to corpus
    generator = new Markov.TextGenerator(corpus);
  });
});

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
    console.log("Result returned, ", result.hexcode);
    return result.hexcode;
}
  result = openmoji.openmojis.find(({ tags }) => tags === word);
  //console.log("Result: ", result);
  if (result !== undefined) {
    console.log("Tags not undefined, ");
    console.log("Result returned, ", result.hexcode);
    return result.hexcode;
}

  return -1;
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
    //Find emojis related to whole term startEmoji, and add to array
    do {
      var complete = false;
      var markovWords = generator.generate({
        wordToStart: startEmoji,
        minWordCount: 1
      });
      if (typeof markovWords !== undefined && words.includes(markovWords[1])  === false) { //If word has been returned
        words.push(markovWords[1]);
      }
      else{
        complete = true;
      }  
    } while (markovWords !== undefined && !complete);

    for (let index = 0; index < words.length; index++) {
      emojis.push(getHexcode(words[index]));
    }

  } catch (error) {
    console.log("Markov error");
  }
  console.log("Words: ", words);
  //TODO: Find emojis related to each word in startEmoji individually, and add to array

  //If emoji array is still not long enough, fill with random emoji:
  while (emojis.length < num) {
    console.log("EmojiLen: " + emojis.length);
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

  //var emojiName = getAnnotation(hexcode);
  var emojiName = 'car'; //TODO: Remove this
  console.log("Starter emoji ID'd as: " + emojiName);
  randomEmojis = generateEmojis(limit, emojiName);

  var jsonEmojis = JSON.stringify(randomEmojis);
  res.json(jsonEmojis);
});


module.exports = router;