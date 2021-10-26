const sharp = require('sharp')
const openmoji = require('openmoji');

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
    isHexcode: function (hex) {
        const result = openmoji.openmojis.find(({ hexcode }) => hexcode === hex);
        if (result !== undefined) {
            return true;
        }
        else {
            return false;
        }
    },
    /*
    Gets the hexcode of an emoji based on it's annotation, 
    returns -1 if word is not an emoji
    */
    getHexcode: function (word) {
        var result = openmoji.openmojis.find(({ annotation }) => annotation === word);
        if (result !== undefined) {
            return result.hexcode;
        }
        result = openmoji.openmojis.find(({ tags }) => tags === word);
        if (result !== undefined) {
            return result.hexcode;
        }
        else {
            return -1;
        }
    },
    /*
    Gets the annotation of an emoji based on it's hexcode, 
    returns -1 if hex is not an emoji
    */
    getAnnotation: function (hex) {
        const result = openmoji.openmojis.find(({ hexcode }) => hexcode === hex);
        if (result.annotation.length > 0) {
            if (Array.isArray(result.annotation)) {
                return result.annotation[0];
            } else {
                return result.annotation;
            }
        }
        return -1;
    },
    /*
    Combines two images into one, 
    finds images of emoji based on hexcode, can only combine emoji found in the installed OpenMoji library
    hex1 is the overlay, hex2 is the base emoji 
    */
    combineIcons: function (hex1, hex2, callback) {
        const overallHeight = 618; // Size of final export
        const overlayHeight = 350; // Size of the overlay
        // No width values because emoji icons are square.

        const anchor = 'southeast'; // changes position of hex1 image relative to hex2

        sharp('./public/images/' + hex1 + '.png')
            .resize({
                fit: sharp.fit.contain,
                height: overlayHeight 
            })
            .toBuffer({ resolveWithObject: true })
            .then(({ data, info }) => {
                sharp('./public/images/' + hex2 + '.png')
                    .resize(overallHeight, overallHeight) 
                    .composite([{
                        input: data, 
                        gravity: anchor 
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
