const express = require("express");
const router = express.Router();
const path = require('path');
const parseString = require('xml2js').parseString;
const fs = require('fs');

const dataRecord = require('../models/recorddata');
const emojiTools = require('../models/emojitools');
const emojiGen = require('../models/emojigenerators');

/*
*/
function generateEmojis(numEmojis, startEmoji) {
  var emojis = emojiGen.markovEmojis(numEmojis, startEmoji);

  //If emoji array is still not long enough, fill with random emoji:
  if(emojis.length < numEmojis){
    var rEmojis = emojiGen.randomEmojis(numEmojis - emojis.length);
    emojis = emojis.concat(rEmojis);
  }

  return emojis;
}

/*
*/
router.get("/:emojihex", function (req, res, next) {
  var hexcode = req.params.emojihex
  var limit = req.query.limit;

  var emojiName = emojiTools.getAnnotation(hexcode);
  //console.log("Starter emoji ID'd as: " + emojiName);
  randomEmojis = generateEmojis(limit, emojiName);
  //dataRecord.saveSelected(hexcode);
  var jsonEmojis = JSON.stringify(randomEmojis);
  console.log(jsonEmojis);
  res.json(jsonEmojis);
});


module.exports = router;