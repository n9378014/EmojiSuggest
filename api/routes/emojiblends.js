var express = require("express");
var router = express.Router();

const openmoji = require('openmoji');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

function getSkintones(starterEmoji) {

}

async function getWords(starterWord) {

  var url = "http://api.conceptnet.io/query?start=/c/en/" + starterWord + '&rel=/r/RelatedTo' + '&limit=1&filter=/c/en';

  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }

  console.log(res.status); // 200
  console.log(res.statusText); // OK

  if (res.status === 200) {
      let data = await res.text();
      console.log(data);
      // handle data
  }
}

async function getBlends(starterEmoji) {
    //url = 'http://api.conceptnet.io/query?start=/c/en/' + concept_A + '&rel=/r/' + relationtype + '&limit=' + str(limit) + '&filter=/c/en' 
    
    var obj;
    let words = await getWords(starterEmoji);

    try {
      keyword = words.edges[0].end.label;
      console.log('Base: ' + starterEmoji);
      console.log('Related word: ' + keyword);
  
      //potentials = openmoji.openmojis.find(emoji => emoji.tags[0] === keyword)
      potentials = openmoji.openmojis.filter(x => x.annotation.includes(keyword))
      console.log(potentials);
      potentials = openmoji.openmojis.filter(x => x.tags.includes(keyword))
      console.log(potentials);

  
    } catch (error) {
      console.log('No edges found through conceptnet: ' + starterEmoji);
    }
}

function identifyEmoji(_hexcode) {
    const result = openmoji.openmojis.find(({ hexcode }) => hexcode === _hexcode);
    return [result.annotation,
            result.tags,
            result.group, //smileys-emotion,people-body,component,animals-nature,food-drink,travel-places
            //activities,objects,symbols,flags,extras-unicode,extras-openmoji
            result.subgroups,
            result.openmoji_tags,
            result.skintone,
            result.skintone_combination,
            result.skintone_base_emoji,
            result.skintone_base_hexcode
            ];
}

function getRelatedHexcodes(_hexcode) {
    //const result = openmoji.openmojis.find(({ hexcode }) => hexcode === _hexcode);
    var matches = []
    openmoji.openmojis.forEach(function(emoji, index){
        //if word exist in url
        if(emoji.hexcode.includes(_hexcode.substring(0,5)) === true){
        console.log(emoji.hexcode);
          matches.push(openmoji.openmojis[index]);
        }
      });
    return matches;
}


/*
Recieves hexcode, and finds related emoji blends. Returns hexcode.
*/
router.get("/:emojihex", function(req, res, next) {
    var hexcode = req.params.emojihex
    var limit = req.query.limit;
    
    // Identify emoji:
    var emojiNames = identifyEmoji(hexcode);
    console.log("EMOJI TAGS:");
    console.log(emojiNames);

    // meee = emojiNames[0].toString()
    // meee = meee.split(" ").join("_").toLowerCase();
    // console.log('NAME: ' + meee);
    // getBlends(meee);

    let emojiTags = emojiNames[1];
    const emojiTagArr = emojiTags.split(", ");
    emojiTagArr.forEach(tag => getBlends(tag));
    
    //Use the identification to conjure blends
    var adjEmoji = getRelatedHexcodes(hexcode);
    //combineEmoji('1F3AE', '1F0CF');


    //console.log(adjEmoji);
        //var skintones = getSkintones(emojiNames);
    //var negativeBlends = 
    //var languageBlends = 
    //var arr = new Array(limit);

    //Blend list format:
    //[
        //[Skintones]
        //[]
    //]
    
    res.json({
        hexcode: hexcode,
        relatedEmoji: adjEmoji
    });
});

/*
EXAMPLE: /1F4A9?limit=1
*/

module.exports = router;