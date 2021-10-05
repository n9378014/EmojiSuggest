var express = require("express");
var router = express.Router();
const openmoji = require('openmoji');

const sharp = require('sharp')
const fs = require('fs');
var path = require('path');
const sessions = require("../controllers/session.controller.js");

var combineEmoji = function (hex1, hex2, callback) {
    sharp('./public/images/' + hex1 + '.png')
        .resize({
            fit: sharp.fit.contain,
            height: 350
        })
        .toBuffer({ resolveWithObject: true })
        .then(({ data, info }) => {
            sharp('./public/images/' + hex2 + '.png')
                .resize(618, 618)
                .composite([{
                    input: data, gravity: 'southeast'
                }])
                .toFile('./public/blends/' + hex1 + hex2 + '.png', function (err) {
                    callback();
                });
        })
        .catch(err => {
            console.log("Error: ", err);
        });
}


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

    for (let index = 0; index < numbers.length; index++) {
        randomEmojis.push([hexcode, openmoji.openmojis[numbers[index]].hexcode]);

        /*
        Create image files here
        */
        var fileName = hexcode + openmoji.openmojis[numbers[index]].hexcode + '.png';
        combineEmoji(hexcode, openmoji.openmojis[numbers[index]].hexcode, function (err) {
            //console.log("Emoji blended");
        });
    }

    /*
    Save to database
    */
    sessions.create(hexcode, randomEmojis.toString());

    /*
    Format blends and send
    */
    var jsonBlends = JSON.stringify(randomEmojis);
    res.json(jsonBlends);
});

module.exports = router;