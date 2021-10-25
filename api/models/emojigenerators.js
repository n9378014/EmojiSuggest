const openmoji = require('openmoji');

/*
Export functions for generating emoji
*/
module.exports = {
    randomEmojis: function (num) {
        var numEmojis = num;

        let numbers = [];
        let emojis = [];
    
        while (numbers.length < numEmojis) {
          var randNum = Math.floor(Math.random() * (openmoji.openmojis.length - 1));
          if (numbers.indexOf(randNum) === -1) numbers.push(randNum);
        }
    
        for (let index = 0; index < numbers.length; index++) {
          emojis.push(openmoji.openmojis[numbers[index]].hexcode);
        }
    
        return emojis;      
    },
    randomEmoji: function () {
        var randNum = Math.floor(Math.random() * (openmoji.openmojis.length - 1));
        var emoji = openmoji.openmojis[randNum].hexcode;
        return emoji;
    }
};
