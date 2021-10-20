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
            console.log("Blendemoji Error: 1:" + hex1+", hex2:"+ hex2, err);
        });
}

// router.get("/:emojihex1/:emojihex2", async function (req, res, next) {
//     var hexcode1 = req.params.emojihex1
//     var hexcode2 = req.params.emojihex2
//     var fileName = './public/blends/' + hexcode1 + hexcode2 + '.png';

//     combineEmoji(hexcode1, hexcode2, function (err) {
//         var options = {
//             root: path.join(__dirname, '../'),
//             dotfiles: 'deny',
//             headers: {
//                 'x-timestamp': Date.now(),
//                 'x-sent': true,
//                 'Content-Type': 'blob'
//             }
//         }
//         let fileExists = fs.existsSync(fileName);
//         console.log(fileName + "Emoji blend exists:", fileExists);

//         res.sendFile(fileName, options, function (err) {
//             if (err) {
//                 next(err)
//             } else {
//                 console.log('Emoji blend sent:', fileName)
//             }
//         })

//     });
// });

router.get("/:emojihex1/:emojihex2", async function (req, res, next) {
    var hexcode1 = req.params.emojihex1
    var hexcode2 = req.params.emojihex2

    var fileName = hexcode1 + hexcode2 + '.png';

    combineEmoji(hexcode1, hexcode2, function (err) {
        // let fileExists = fs.existsSync('./public/blends/' + fileName);
        // console.log(fileName + "Emoji blend exists:", fileExists);

        res.json({
            url: fileName
        });
    });
});

module.exports = router;