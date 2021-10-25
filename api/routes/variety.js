const express = require("express");
const router = express.Router();

const emojiTools = require('../models/emojitools');
const emojiGen = require('../models/emojigenerators');
const dataRecord = require('../models/recorddata');

/*
*/
router.get("/:selHex", function(req, res, next) {
    var hexcode = req.params.selHex
    var limit = req.query.limit;
    var prev = req.query.prev;
    if(true){ //Check if hexcode exists in OpenMoji emojitools.isHexcode(hexcode)
        if(!req.query.prev){ //Previous emoji not specified
            dataRecord.saveSelected(hexcode);
        }
        else{
            dataRecord.saveSelectedWithPrevious(hexcode, prev);
        }    
        var randomEmojis = emojiGen.randomEmojis(limit);
        var randomBlends = [];
        var markovEmojis = emojiGen.randomEmojis(limit, hexcode);
        var markovBlends = [];

        emojiGen.randomBlends(limit, hexcode, function (blends) {
            randomBlends = blends;
            var jsonEmojis = JSON.stringify([randomEmojis, randomBlends, markovEmojis, markovBlends]);
            res.json(jsonEmojis);    
        });


    }
    else{
        console.log("Encountered a problem");
        res.status(500);
    }
});

module.exports = router;