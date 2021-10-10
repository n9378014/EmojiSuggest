var express = require("express");
var router = express.Router();

const openmoji = require('openmoji');

/*
TODO: Update with markov chains
*/
function generateEmojis(num) {
    /*
    Old code below.
    TODO: Update with markov chains
    */  
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

    return emojis;  
  }

/*
*/
router.get("/", function(req, res, next) {
    var limit = req.query.limit;
    randomEmojis = generateEmojis(limit);
    var jsonEmojis = JSON.stringify(randomEmojis);
    res.json(jsonEmojis);
});


module.exports = router;