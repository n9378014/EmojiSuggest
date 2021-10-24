var express = require("express");
//var router = express.Router();
const fs = require('fs');

/*
*/
module.exports = {
    save: function (selHex) {
        fs.appendFile('researchdata.txt', selHex + ',', function (err) {
            if (err) {
                console.log("Error: ", err);
            } else {
                console.log("Successfully updated research data.");
            }
        })
        }
  };

//module.exports = router;