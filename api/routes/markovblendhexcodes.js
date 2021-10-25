var express = require("express");
var router = express.Router();
var path = require('path');
var parseString = require('xml2js').parseString;
const fs = require('fs');
const openmoji = require('openmoji');
const Markov = require('node-markov-generator');
const sharp = require('sharp')
var natural = require('natural');

var corpus = fs.readFileSync('corpus.txt').toString().split(",");
var generator = new Markov.TextGenerator(corpus);

var emojiTools = require('../models/emojitools');

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
    else {
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



function getBlendHexcode(num, startEmoji) {
    return new Promise((resolve, reject) => {
        var numEmojis = num; //113; //id 56 is the center
        let words = [];
        let wordsOccurences = [];
        let emojis = [];
    
        try {
    
            var startEmojiWords = [startEmoji];
    
            if (startEmoji.includes(' ')) {
                startEmojiWords = startEmojiWords.concat(startEmoji.replace(',', '').replace(':', '').split(' '));
            }
            startEmojiWords.forEach(emojiWord => {
                // const generator = new Markov.TextGenerator(corpusPath);
                // const result = generator.generate({
                //   wordToStart: emojiWord,
                //   minWordCount: 1,
                //   maxWordCount: 1
                // });
    
                var tokens = generator.wordStorage.get(emojiWord);
                var arrTokens = [];
                if (tokens !== undefined) {
                    arrTokens = [...tokens.values.keys()];
                    if (arrTokens !== undefined) {
                        for (let i = 0; i < arrTokens.length; i++) {
                            arrTokens[i] = [arrTokens[i], tokens.values.get(arrTokens[i]).numberOfOccurrences];
                        }
                        arrTokens.sort((a, b) => b[1] - a[1]);
                        // console.log("First", arrTokens[0]);
                        // console.log("Last", arrTokens[arrTokens.length - 1]);
                    }
                }
                else{
                    stemmer = natural.PorterStemmer;
                    tokens = generator.wordStorage.get(stemmer.stem(emojiWord));
                    if (tokens !== undefined) {
                        arrTokens = [...tokens.values.keys()];
                        for (let i = 0; i < arrTokens.length; i++) {
                            arrTokens[i] = [arrTokens[i], tokens.values.get(arrTokens[i]).numberOfOccurrences];
                        }
                        arrTokens.sort((a, b) => b[1] - a[1]);
                    }
                }
                        
                arrTokens.forEach(token => {
                    if (words.includes(token[0]) === false) {
                        wordsOccurences.push(token);
                        words.push(token[0]);
                    }
                });
            });
            words = [];
            wordsOccurences.sort((a, b) => b[1] - a[1]);
            wordsOccurences.forEach(token => {
                words.push(token[0]);
            });
    
            for (let index = 0; index < words.length; index++) {
                var hex = getHexcode(words[index]);
                if (hex !== -1 && emojis.length < num) {
                    emojis.push(hex);
                }
            }
    
        } catch (error) {
            console.log("Markov error", error);
        }
        //console.log("Words: ", words);
    
        //If emoji array is still not long enough, fill with random emoji:
        while (emojis.length < num) {
            var r = Math.floor(Math.random() * (openmoji.openmojis.length - 1));
            var rHex = openmoji.openmojis[r].hexcode;
            if (emojis.indexOf(rHex) === -1) emojis.push(rHex);
        }
    
        // if (emojis.length < num) {
        //   for (let i = emojis.length; i < num; i++) {
        //     emojis.push('1F436');
        //   }
        // }
        //console.log("Emojis: ", emojis);
    
        resolve(emojis);
        })
  }

/*
*/
router.get("/:emojihex", function (req, res, next) {
    var hexcode = req.params.emojihex;
    var limit = req.query.limit;
    var emojiName = getAnnotation(hexcode);
    console.log("Starter emoji ID'd as: " + emojiName);

    Promise.all([getBlendHexcode(limit, emojiName)]).then((values) => {
        var randomEmojis = values[0];
    
        var hexcodesProcessed = 0;
        randomEmojis.forEach(async emoji => {
            //randomEmojis.push([hexcode, openmoji.openmojis[num].hexcode]);
            randomEmojis[randomEmojis.indexOf(emoji)] = [hexcode, emoji];
            //Create image files here:
            var fileName = hexcode + emoji + '.png';
            await emojiTools.combineIcons(hexcode, emoji, function (err) {
                //console.log("Emoji blended");
                hexcodesProcessed++;
                if (hexcodesProcessed === randomEmojis.length) {
                    //Save to database:
                    //sessions.create(hexcode, randomEmojis.toString());
    
                    //Format blends and send:
                    var jsonBlends = JSON.stringify(randomEmojis);
                    res.json(jsonBlends);
                }    
            });
        });
    
      });
    //randomEmojis = getBlendHexcode(limit, emojiName);//generateEmojis(limit, emojiName);
    // var jsonEmojis = JSON.stringify(randomEmojis);
    // res.json(jsonEmojis);
});


module.exports = router;