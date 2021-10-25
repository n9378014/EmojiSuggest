const emojiTools = require('../models/emojitools');
const openmoji = require('openmoji');

const Markov = require('node-markov-generator');
const natural = require('natural');
const fs = require('fs');

var wndb = require('wordnet-db');
const WordNet = require("node-wordnet");
const wordnet = new natural.WordNet(wndb.path);

var corpus = fs.readFileSync('corpus.txt').toString().split(",");
var generator = new Markov.TextGenerator(corpus);

/*
Export functions for generating emoji
*/
module.exports = {
    /*
    Generates a single random emoji hexcode
    */
    randomEmoji: function () {
        var randNum = Math.floor(Math.random() * (openmoji.openmojis.length - 1));
        var emoji = openmoji.openmojis[randNum].hexcode;
        return emoji;
    },
    randomEmojis: function (numEmojis) {
        let numbers = [];
        let emojis = [];

        while (numbers.length < numEmojis) {
            var randNum = Math.floor(Math.random() * (openmoji.openmojis.length - 1));
            if (numbers.indexOf(randNum) === -1) numbers.push(randNum);
        }

        for (let index = 0; index < numbers.length; index++) {
            emojis.push(openmoji.openmojis[numbers[index]].hexcode);
        }

        return emojis;
    },
    randomBlends: function (limit, hexcode, callback) {
        let randomEmojis = [];
        let numbers = [];

        while (numbers.length < limit) {
            var r = Math.floor(Math.random() * (openmoji.openmojis.length - 1));
            numbers.push(r);
        }

        var hexcodesProcessed = 0;
        numbers.forEach(async num => {
            randomEmojis.push([hexcode, openmoji.openmojis[num].hexcode]);

            //Create image files here:
            var fileName = hexcode + openmoji.openmojis[num].hexcode + '.png';
            await emojiTools.combineIcons(hexcode, openmoji.openmojis[num].hexcode, function (err) {
                //console.log("Emoji blended");
                hexcodesProcessed++;
                if (hexcodesProcessed === numbers.length) {
                    callback(randomEmojis);
                }
            });
        });
    },
    markovEmojis: function (numEmojis, startEmoji) {
        let words = [];
        let wordsOccurences = [];
        let emojis = [];

        try {

            var startEmojiWords = [startEmoji];

            if (startEmoji.includes(' ')) {
                startEmojiWords = startEmojiWords.concat(startEmoji.replace(',', '').replace(':', '').split(' '));
            }
            startEmojiWords.forEach(emojiWord => {
                console.log(emojiWord);
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
                else {
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
                var hex = emojiTools.getHexcode(words[index]);
                if (hex !== -1 && emojis.length < numEmojis) {
                    emojis.push(hex);
                }
            }
        } catch (error) {
            console.log("Markov error", error);
        }
        return emojis;
    },
    markovBlends: function (numEmojis, hexcode, callback) {
            var startEmoji = emojiTools.getAnnotation(hexcode);
            let words = [];
            let wordsOccurences = [];
            let emojis = [];
            let blends = [];
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
                    else {
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
                    var hex = emojiTools.getHexcode(words[index]);
                    if (hex !== -1 && emojis.length < numEmojis) {
                        emojis.push(hex);
                    }
                }
            } catch (error) {
                console.log("Markov error", error);
            }

            //If emoji array is still not long enough, fill with random emoji:
            while (emojis.length < numEmojis) {
                var r = Math.floor(Math.random() * (openmoji.openmojis.length - 1));
                var rHex = openmoji.openmojis[r].hexcode;
                if (emojis.indexOf(rHex) === -1) emojis.push(rHex);
            }

            var hexcodesProcessed = 0;
            emojis.forEach(async hex => {
                blends.push([hexcode, hex]);
    
                //Create image files here:
                await emojiTools.combineIcons(hexcode, hex, function (err) {
                    hexcodesProcessed++;
                    if (hexcodesProcessed === emojis.length) {
                        callback(blends);
                    }
                });
            });
    },
    wordnetBlends: function (numEmojis, hexcode, callback) {
        var startEmoji = 'dog';//emojiTools.getAnnotation(hexcode);
        wordnet.lookup(startEmoji, function(details) {
            console.log("Word: " + startEmoji);
            console.log("Definition: " + details[0].def);
            console.log("Synonyms: " + details[0].synonyms);
            //console.dir(details);
        });
        // wordnet.synsets(startEmoji, function(details) {
        //     console.dir(details);
        // });
    }
};
