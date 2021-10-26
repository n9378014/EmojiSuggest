const fs = require('fs');

/*
*/
module.exports = {
    saveSelected: function (selHex) {
        selHex = selHex.replace(',', '+');
        fs.appendFile('researchdata.txt', '[' + selHex + '],\n', function (err) {
            if (err) {
                console.log("Error: ", err);
            } else {
                console.log("Successfully updated research data.");
            }
        })
    },
    saveSelectedWithPrevious: function (selHex, prevHex) {
        selHex = selHex.replace(',', '+');
        prevHex = prevHex.replace(',', '+');

        fs.appendFile('researchdata.txt', '[' + prevHex + '>' + selHex + '],\n', function (err) {
            if (err) {
                console.log("Error: ", err);
            } else {
                console.log("Successfully updated research data.");
            }
        })
    }
  };