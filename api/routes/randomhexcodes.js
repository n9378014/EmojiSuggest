var express = require("express");
var router = express.Router();

const openmoji = require('openmoji');

function generateEmojis(num) {

    var numEmojis = num; //113; //id 56 is the center

    let numbers = [];
    let emojis = [];

    while (numbers.length < numEmojis) {
      var r = Math.floor(Math.random() * (openmoji.openmojis.length - 1));
      if (numbers.indexOf(r) === -1) numbers.push(r);
    }

    for (let index = 0; index < numbers.length; index++) {
      emojis.push(openmoji.openmojis[numbers[index]].hexcode);
    }

    return emojis;   // The function returns the product of p1 and p2
  }

/*
*/
router.get("/", function(req, res, next) {
    var limit = req.query.limit;
    randomEmojis = generateEmojis(limit);
    var jsonEmojis = JSON.stringify(randomEmojis);
    res.json(jsonEmojis);
});

/*
EXAMPLE: /1F4A9?limit=1
*/

module.exports = router;