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
        sharp('./public/images/' + hex1 + '.png')
            .resize({
                fit: sharp.fit.contain,
                height: 350 //Size of the overlay
            })
            .toBuffer({ resolveWithObject: true })
            .then(({ data, info }) => {
                sharp('./public/images/' + hex2 + '.png')
                    .resize(618, 618) //Size of final export
                    .composite([{
                        input: data, 
                        gravity: 'southeast' //changes position of hex1 image relative to hex2
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