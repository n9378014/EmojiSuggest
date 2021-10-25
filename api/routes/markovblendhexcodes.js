const express = require("express");
const router = express.Router();
const path = require('path');
const parseString = require('xml2js').parseString;
const fs = require('fs');

const emojiTools = require('../models/emojitools');
const emojiGen = require('../models/emojigenerators');

/*
*/
router.get("/:emojihex", function (req, res, next) {
    const hexcode = req.params.emojihex;
    var limit = req.query.limit;
    var emojiName = emojiTools.getAnnotation(hexcode);
    console.log("Starter emoji ID'd as: " + emojiName);

    emojiGen.markovBlends(limit, emojiName, function (blends) {
        var randomEmojis = blends;

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

    // Promise.all([emojiGen.markovBlends(limit, emojiName)]).then((values) => {
    //     var randomEmojis = values[0];
    
    //     var hexcodesProcessed = 0;
    //     randomEmojis.forEach(async emoji => {
    //         //randomEmojis.push([hexcode, openmoji.openmojis[num].hexcode]);
    //         randomEmojis[randomEmojis.indexOf(emoji)] = [hexcode, emoji];
    //         //Create image files here:
    //         var fileName = hexcode + emoji + '.png';
    //         await emojiTools.combineIcons(hexcode, emoji, function (err) {
    //             //console.log("Emoji blended");
    //             hexcodesProcessed++;
    //             if (hexcodesProcessed === randomEmojis.length) {
    //                 //Save to database:
    //                 //sessions.create(hexcode, randomEmojis.toString());
    
    //                 //Format blends and send:
    //                 var jsonBlends = JSON.stringify(randomEmojis);
    //                 res.json(jsonBlends);
    //             }    
    //         });
    //     });
    //   });
});


module.exports = router;