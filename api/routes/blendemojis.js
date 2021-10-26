var express = require("express");
var router = express.Router();

const sharp = require('sharp')
const fs = require('fs');
var path = require('path');
const emojiTools = require('../models/emojitools');

router.get("/:emojihex1/:emojihex2", async function (req, res, next) {
    var hexcode1 = req.params.emojihex1
    var hexcode2 = req.params.emojihex2

    var fileName = hexcode1 + hexcode2 + '.png';

    emojiTools.combineIcons(hexcode, hexcode2, function (err) {
        // let fileExists = fs.existsSync('./public/blends/' + fileName);
        // console.log(fileName + "Emoji blend exists:", fileExists);

        res.json({
            url: fileName
        });
    });
});

module.exports = router;