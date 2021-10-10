var express = require("express");
var router = express.Router();

const sharp = require('sharp')
const fs = require('fs');
var path = require('path');

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
                    //console.log("Output file: ", './public/blends/' + hex1 + hex2 + '.png');
                    callback();
                });
        })
        .catch(err => {
            console.log("Error: ", err);
        });
}

router.get("/:emojihex1/:emojihex2", async function (req, res, next) {
    var hexcode1 = req.params.emojihex1
    var hexcodeArr = req.params.emojihex2.split(" ");
    var urlArr = [];
    var hexcode2 = '1F4A9';

    if(hexcodeArr.length > 0){
        hexcodeArr.forEach(hex => {
            combineEmoji(hexcode1, hex, function (err) {
                console.log("Emoji blended: " + hexcode1 + " + " + hex)
                urlArr.push(hexcode1 + hex + '.png')
            });
        });
        var jsonURLs = JSON.stringify(urlArr);
        res.json(jsonURLs);
    }
    else{
        var fileName = hexcode1 + hexcode2 + '.png';
        combineEmoji(hexcode1, hexcode2, function (err) {
            // let fileExists = fs.existsSync('./public/blends/' + fileName);
            // console.log(fileName + "Emoji blend exists:", fileExists);
    
            res.json({
                url: fileName
            });
        });    
    }
});

module.exports = router;