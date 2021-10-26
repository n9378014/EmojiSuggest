const express = require("express");
const router = express.Router();

const emojiTools = require('../models/emojitools');
const emojiGen = require('../models/emojigenerators');
const dataRecord = require('../models/recorddata');

/*
*/
router.get("/:selHex", function (req, res, next) {
    const hexcode = req.params.selHex
    const limit = req.query.limit;
    const prev = req.query.prev;
    const blendedWith = req.query.blendedwith;
    console.log("Prev: " + prev);
    let selectedData = hexcode;
    if (req.query.blendedwith) { //blended emoji  specified
        console.log("Blendedwith: " + blendedWith);

        selectedData = hexcode + '+' + blendedWith;
    }

    console.log("Selecteddats: " + selectedData);

    if (true) { //Check if hexcode exists in OpenMoji emojitools.isHexcode(hexcode)
        if (!req.query.prev) { //Previous emoji not specified
            dataRecord.saveSelected(selectedData);
        }
        else {
            dataRecord.saveSelectedWithPrevious(selectedData, prev);
        }
        var randomEmojis = emojiGen.randomEmojis(limit);
        var randomBlends = [];
        var markovEmojis = emojiGen.randomEmojis(limit, hexcode);
        var markovBlends = [];

        emojiGen.randomBlends(limit, hexcode, function (blends) {
            randomBlends = blends;
            //console.log(randomBlends);
            emojiGen.markovBlends(limit, hexcode, function (mBlends) {
                markovBlends = mBlends;
                var jsonEmojis = JSON.stringify([randomEmojis, randomBlends, markovEmojis, markovBlends]);
                //console.log(jsonEmojis);
                res.json(jsonEmojis);
            });
        });
    }
    else {
        console.log("Encountered a problem");
        res.status(500);
    }
});

module.exports = router;