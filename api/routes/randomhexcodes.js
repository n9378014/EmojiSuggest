var express = require("express");
var router = express.Router();

var emojiGen = require('../models/emojigenerators');

/*
EXAMPLE: /1F4A9?limit=1
*/
router.get("/", function(req, res, next) {
    var limit = req.query.limit;
    randomEmojis = emojiGen.randomEmojis(limit);//generateEmojis(limit);
    var jsonEmojis = JSON.stringify(randomEmojis);
    res.json(jsonEmojis);
});

module.exports = router;