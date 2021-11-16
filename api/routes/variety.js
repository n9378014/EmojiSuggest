const express = require("express");
const router = express.Router();

const emojiTools = require('../models/emojitools');
const emojiGen = require('../models/emojigenerators');
const dataRecord = require('../models/recorddata');
var count = 0;
const maxCount = 6;
var cat1Blends = []; //42
var cat2Blends = []; //15
var cat3Blends = []; //42 //random
var cat4Blends = []; //47
var cat5Blends = []; //21
var cat6Blends = []; //47 //random
var cat7Blends = [];
var cat8Blends = [];
var cat9Blends = [];
var cat11Blends = [];
var cat12Blends = [];
var extraBlends = [];

/*
*/
router.get("/:selHex", function (req, res, next) {
    var hexcode = req.params.selHex
    const limit = req.query.limit;
    var prev = req.query.prev;
    var blendedWith = req.query.blendedwith;
    console.log("Prev: " + prev);
    let selectedData = hexcode;
    if (req.query.blendedwith) { //blended emoji  specified
        console.log("Blendedwith: " + blendedWith);

        selectedData = hexcode + '+' + blendedWith;
    }
    if (hexcode.includes(',')) {
        var str = hexcode.split(',');
        blendedWith = str[0];
        hexcode = str[1];
    }
    console.log("Selecteddats: " + selectedData);

    if (true) { //Check if hexcode exists in OpenMoji emojitools.isHexcode(hexcode)
        if (!req.query.prev) { //Previous emoji not specified
            dataRecord.saveSelected(selectedData);
        }
        else {
            console.log("THere is aprevieous: " + typeof prev + ' ' + prev);
            dataRecord.saveSelectedWithPrevious(selectedData, prev);
            if (Array.isArray(prev)) {
                console.log("prev is array");
                prev = prev[1];
            }
            else {
                console.log('its not an array');
                if (prev.includes(',') === true) {
                    console.log("it includes ,");
                    let prevArr = prev.split(',');
                    console.log(prevArr);
                    console.log(prevArr.length);

                    if (prevArr.length > 1) {
                        console.log("greater than 1")
                        prev = prevArr[1];
                    }
                    else {
                        prev = prevArr[0];
                    }
                    console.log("prev is now " + prev);
                }

            }
        }
        // var randomEmojis = emojiGen.randomEmojis(limit);
        // var randomBlends = [];
        // var markovEmojis = emojiGen.randomEmojis(limit, hexcode);
        // var markovBlends = [];

        count = 0;
        cat1Blends = []; //42
        cat2Blends = []; //15
        cat3Blends = []; //42 //random
        cat4Blends = []; //47
        cat5Blends = []; //21
        cat6Blends = []; //47 //random
        cat7Blends = emojiGen.randomEmojis(9); //right // always random

        cat8Blends = emojiGen.markovEmojis(7, hexcode); //7 //right-down //co-hyponyms
        cat9Blends = emojiGen.markovEmojis(7, hexcode); //7 //left-down //conversational 
        cat11Blends = emojiGen.markovEmojis(6, hexcode);   //6 //Left-up // always conversational
        cat12Blends = emojiGen.markovEmojis(6, hexcode); //6 //right-up //co-hyponyms
        extraBlends = [];

        emojiGen.randomBlends(42 + 47, hexcode, function (blendsRand) {
            cat3Blends = blendsRand.slice(0, 42);
            cat6Blends = blendsRand.slice(42);

            //8
            if (true) { //single word annotation
                if(!blendedWith){
                    emojiGen.cohyponymEmojis(6, hexcode, 0, function (emojis) {
                        cat8Blends = emojis;
                        count++;
                        if (count === maxCount) {
                            let jsonEmojis = JSON.stringify([cat1Blends, cat2Blends, cat3Blends, cat4Blends, cat5Blends, cat6Blends, cat7Blends, cat8Blends, cat9Blends, cat11Blends, cat12Blends, extraBlends]);
                            res.json(jsonEmojis);
                        }
        
                    });    
                }
                else{
                    emojiGen.cohyponymEmojis(6, blendedWith, 0, function (emojis) {
                        cat8Blends = emojis;
                        count++;
                        if (count === maxCount) {
                            let jsonEmojis = JSON.stringify([cat1Blends, cat2Blends, cat3Blends, cat4Blends, cat5Blends, cat6Blends, cat7Blends, cat8Blends, cat9Blends, cat11Blends, cat12Blends, extraBlends]);
                            res.json(jsonEmojis);
                        }
        
                    });    
                }
            }

            //12
            if (!blendedWith) { //Not blended
                emojiGen.cohyponymEmojis(6, hexcode, 6, function (emojis) {
                    cat12Blends = emojis;
                    console.log("Cool beanz happends");
                    count++;
                    if (count === maxCount) {
                        let jsonEmojis = JSON.stringify([cat1Blends, cat2Blends, cat3Blends, cat4Blends, cat5Blends, cat6Blends, cat7Blends, cat8Blends, cat9Blends, cat11Blends, cat12Blends, extraBlends]);
                        res.json(jsonEmojis);
                    }
    
                });
            }
            else {
                emojiGen.cohyponymEmojis(6, hexcode, 0, function (emojis) {
                    cat12Blends = emojis;
                    console.log("Cool beanz happends");
                    count++;
                    if (count === maxCount) {
                        let jsonEmojis = JSON.stringify([cat1Blends, cat2Blends, cat3Blends, cat4Blends, cat5Blends, cat6Blends, cat7Blends, cat8Blends, cat9Blends, cat11Blends, cat12Blends, extraBlends]);
                        res.json(jsonEmojis);
                    }
    
                });
            }


            //1/2
            emojiGen.markovBlends(42 + 15, hexcode, function (blends) {
                cat1Blends = blends.slice(0, 42);
                cat2Blends = blends.slice(42);
                count++;
                console.log(count);

                if (count === maxCount) {
                    let jsonEmojis = JSON.stringify([cat1Blends, cat2Blends, cat3Blends, cat4Blends, cat5Blends, cat6Blends, cat7Blends, cat8Blends, cat9Blends, cat11Blends, cat12Blends, extraBlends]);
                    res.json(jsonEmojis);
                }
            });

            //4 and 5
            if (!blendedWith) {
                emojiGen.markovBlends(47 + 21, hexcode, function (blends) {
                    cat4Blends = blends.slice(0, 47);
                    cat5Blends = blends.slice(47);
                    count++;
                    count++;
                    console.log(count);
                    if (count === maxCount) {
                        let jsonEmojis = JSON.stringify([cat1Blends, cat2Blends, cat3Blends, cat4Blends, cat5Blends, cat6Blends, cat7Blends, cat8Blends, cat9Blends, cat11Blends, cat12Blends, extraBlends]);
                        res.json(jsonEmojis);
                    }

                });
            }
            else {
                cat8Blends = emojiGen.markovEmojis(7, blendedWith); //7 //right-down //conversational or co-hyponyms
                cat9Blends = emojiGen.markovEmojis(7, blendedWith); //7 //left-down //conversational or co-hyponyms

                emojiGen.randomBlends(47, blendedWith, function (blendsRandBot) {
                    cat6Blends = blendsRandBot;
                    count++;
                    console.log(count);
                    if (count === maxCount) {
                        let jsonEmojis = JSON.stringify([cat1Blends, cat2Blends, cat3Blends, cat4Blends, cat5Blends, cat6Blends, cat7Blends, cat8Blends, cat9Blends, cat11Blends, cat12Blends, extraBlends]);
                        res.json(jsonEmojis);
                    }
                });
                emojiGen.markovBlends(47 + 21, blendedWith, function (blends) {
                    cat4Blends = blends.slice(0, 47);
                    cat5Blends = blends.slice(47);
                    count++;
                    console.log(count);

                    if (count === maxCount) {
                        let jsonEmojis = JSON.stringify([cat1Blends, cat2Blends, cat3Blends, cat4Blends, cat5Blends, cat6Blends, cat7Blends, cat8Blends, cat9Blends, cat11Blends, cat12Blends, extraBlends]);
                        res.json(jsonEmojis);
                    }
                });
            }

            //extras
            if (req.query.prev) { //prev emoji  specified    
                extraBlends = [[hexcode, prev], [prev, hexcode]];
                emojiTools.combineIcons(hexcode, prev, function () {
                    emojiTools.combineIcons(prev, hexcode, function () {
                        count++;
                        console.log(count);

                        if (count === maxCount) {
                            let jsonEmojis = JSON.stringify([cat1Blends, cat2Blends, cat3Blends, cat4Blends, cat5Blends, cat6Blends, cat7Blends, cat8Blends, cat9Blends, cat11Blends, cat12Blends, extraBlends]);
                            res.json(jsonEmojis);
                        }
                    })
                })
            }
            else {
                count++;
                if (count === maxCount) {
                    let jsonEmojis = JSON.stringify([cat1Blends, cat2Blends, cat3Blends, cat4Blends, cat5Blends, cat6Blends, cat7Blends, cat8Blends, cat9Blends, cat11Blends, cat12Blends, extraBlends]);
                    res.json(jsonEmojis);
                }

            }

        });

        // emojiGen.randomBlends(42 + 15 + 42 + 47 + 21 + 47, hexcode, function (blendsTop) {
        //     cat1Blends = blendsTop.slice(0, 42);
        //     cat2Blends = blendsTop.slice(42, 57);
        //     cat3Blends = blendsTop.slice(57, 99);

        //     if (!blendedWith) {
        //         //Bottom row
        //         cat4Blends = blendsTop.slice(0, 47);
        //         cat5Blends = blendsTop.slice(47, 68);
        //         cat6Blends = blendsTop.slice(68);

        //         if (req.query.prev) { //prev emoji  specified    
        //             extraBlends = [[hexcode, prev], [prev, hexcode]];
        //             emojiTools.combineIcons(hexcode, prev, function () {
        //                 emojiTools.combineIcons(prev, hexcode, function () {
        //                     var jsonEmojis = JSON.stringify([cat1Blends, cat2Blends, cat3Blends, cat4Blends, cat5Blends, cat6Blends, cat7Blends, cat8Blends, cat9Blends, cat11Blends, cat12Blends, extraBlends]);
        //                     res.json(jsonEmojis);
        //                 })
        //             })
        //         }
        //         else {
        //             var jsonEmojis = JSON.stringify([cat1Blends, cat2Blends, cat3Blends, cat4Blends, cat5Blends, cat6Blends, cat7Blends, cat8Blends, cat9Blends, cat11Blends, cat12Blends, extraBlends]);
        //             res.json(jsonEmojis);
        //         }
        //     }
        //     else {
        //         emojiGen.randomBlends(47 + 21 + 47, blendedWith, function (blendsBot) {
        //             //Bottom row
        //             cat4Blends = blendsBot.slice(0, 47);
        //             cat5Blends = blendsBot.slice(47, 68);
        //             cat6Blends = blendsBot.slice(68);

        //             if (req.query.prev) { //prev emoji  specified    
        //                 extraBlends = [[hexcode, prev], [prev, hexcode]];
        //                 emojiTools.combineIcons(hexcode, prev, function () {
        //                     emojiTools.combineIcons(prev, hexcode, function () {
        //                         var jsonEmojis = JSON.stringify([cat1Blends, cat2Blends, cat3Blends, cat4Blends, cat5Blends, cat6Blends, cat7Blends, cat8Blends, cat9Blends, cat11Blends, cat12Blends, extraBlends]);
        //                         res.json(jsonEmojis);
        //                     })
        //                 })
        //             }
        //             else {
        //                 var jsonEmojis = JSON.stringify([cat1Blends, cat2Blends, cat3Blends, cat4Blends, cat5Blends, cat6Blends, cat7Blends, cat8Blends, cat9Blends, cat11Blends, cat12Blends, extraBlends]);
        //                 res.json(jsonEmojis);
        //             }

        //         });

        //     }
        // });

        //

        // emojiGen.randomBlends(limit, hexcode, function (blends) {
        //     randomBlends = blends;
        //     //console.log(randomBlends);
        //     emojiGen.markovBlends(limit, hexcode, function (mBlends) {
        //         markovBlends = mBlends;
        //         var jsonEmojis = JSON.stringify([randomEmojis, randomBlends, markovEmojis, markovBlends]);
        //         //console.log(jsonEmojis);
        //         res.json(jsonEmojis);
        //     });
        // });
    }
    else {
        console.log("Encountered a problem");
        res.status(500);
    }
});

module.exports = router;