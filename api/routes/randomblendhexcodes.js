var express = require("express");
var router = express.Router();
const openmoji = require('openmoji');

const fs = require('fs');
var path = require('path');
const emojiTools = require('../models/emojitools');
const emojiGen = require('../models/emojigenerators');

/*
Recieves hexcode, and finds unrelated emoji blends. Returns array of hexcodes.
*/
router.get("/:emojihex", function (req, res, next) {
    var hexcode = req.params.emojihex
    var limit = req.query.limit;
    var category = req.query.category;
    //var randomEmojis = [];
    emojiGen.randomBlends(limit, hexcode, function (randomEmojis) {
        //Format blends and send:
        var jsonBlends = JSON.stringify(randomEmojis);
        res.json(jsonBlends);
    });
});

module.exports = router;