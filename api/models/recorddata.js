const fs = require('fs');

/*
*/
module.exports = {
    saveSelected: function (selHex) {
        fs.appendFile('researchdata.txt', '[' + selHex + '],\n', function (err) {
            if (err) {
                console.log("Error: ", err);
            } else {
                console.log("Successfully updated research data.");
            }
        })
    },
    saveSelectedWithPrevious: function (selHex, prevHex) {
        fs.appendFile('researchdata.txt', '[' + prevHex + '>' + selHex + '],\n', function (err) {
            if (err) {
                console.log("Error: ", err);
            } else {
                console.log("Successfully updated research data.");
            }
        })
    }
  };