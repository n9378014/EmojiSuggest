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

    emojiGen.markovBlends(limit, hexcode, function (blends) {
        var jsonBlends = JSON.stringify(blends);
        res.json(jsonBlends);

        var randomEmojis = blends;

        // var hexcodesProcessed = 0;
        // randomEmojis.forEach(async emoji => {
        //     //randomEmojis.push([hexcode, openmoji.openmojis[num].hexcode]);
        //     randomEmojis[randomEmojis.indexOf(emoji)] = [hexcode, emoji];
        //     //Create image files here:
        //     await emojiTools.combineIcons(hexcode, emoji, function (err) {
        //         hexcodesProcessed++;
        //         if (hexcodesProcessed === randomEmojis.length) {
        //             //Save to database:
        //             //sessions.create(hexcode, randomEmojis.toString());
    
        //             //Format blends and send:
        //             var jsonBlends = JSON.stringify(randomEmojis);
        //             res.json(jsonBlends);
        //         }    
        //     });
        // });
    });
});

module.exports = router;