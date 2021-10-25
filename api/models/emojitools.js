const fs = require('fs');
const sharp = require('sharp')

/*
Export functions for identifying and processing emoji
*/
module.exports = {
    isEmoji: function (word) {
        const resultAnnotation = openmoji.openmojis.find(({ annotation }) => annotation === word);
        if (resultAnnotation !== undefined) {
            return true;
        }
        else {
            const resultTags = openmoji.openmojis.find(({ tags }) => tags === word);
            if (resultTags !== undefined) {
                return true;
            }
            else {
                return false;
            }
        }
    },
    combineIcons: function (hex1, hex2, callback) {
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
};
