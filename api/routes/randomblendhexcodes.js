var express = require("express");
var router = express.Router();
const openmoji = require('openmoji');

const sharp = require('sharp')
const fs = require('fs');
var path = require('path');
//const sessions = require("../controllers/session.controller.js");
var emojiTools = require('../models/emojitools');

/*
Recieves hexcode, and finds related emoji blends. Returns array of hexcodes.
*/
router.get("/:emojihex", function (req, res, next) {
    var hexcode = req.params.emojihex
    var limit = req.query.limit;
    var category = req.query.category;

    /*
    Placeholder of 8 blends, for testing purposes
    */
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
                //Save to database:
                //sessions.create(hexcode, randomEmojis.toString());
    
                //Format blends and send:
                var jsonBlends = JSON.stringify(randomEmojis);
                res.json(jsonBlends);
            }    
        });
    });
});

module.exports = router;