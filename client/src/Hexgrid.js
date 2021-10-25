import { TiledHexagons } from 'tiled-hexagons'
import { useState, useEffect } from 'react'
import React, { Component } from 'react';
import { saveAs } from 'file-saver';

const openmoji = require('openmoji');
const fs = require('fs');

const numEmojis = 259;
const maxHorizontal = 19;//111
const maxVertical = Math.ceil(numEmojis / maxHorizontal);

const center = Math.round((maxHorizontal * (maxVertical / 4)) + ((maxHorizontal - 1) * (maxVertical / 4))) - Math.round((maxHorizontal) / 2);//Math.ceil(numEmojis/2)-3;
const lenHistory = Math.ceil(maxHorizontal / 2) - 1;
const lenRandom = lenHistory;
const defaultEmojis = [];

for (let index = 0; index < numEmojis; index++) {
  defaultEmojis.push(openmoji.openmojis[3073].hexcode);
}
var tempmojis = [[]];
for (let index = 0; index < numEmojis; index++) {
  tempmojis[0].push(openmoji.openmojis[3073].hexcode)
}


const cat1Index = [0, 1, 2, 3, 4, 5, //Top left petal 
  19, 20, 21, 22, 23, 24,
  37, 38, 39, 40, 41, 42, 43,
  56, 57, 58, 59, 60, 61, 62,
  74, 75, 76, 77, 78, 79, 80, 81,
  93, 94, 95, 96, 97, 98, 99, 100].reverse(); //100

const cat2Index = [7, 8, 9, 10, 11, //Top middle petal 
  26, 27, 28, 29,
  45, 46, 47,
  64, 65,
  83].reverse();

const cat3Index = [13, 14, 15, 16, 17, 18, //Top right petal
  31, 32, 33, 34, 35, 36,
  49, 50, 51, 52, 53, 54, 55,
  67, 68, 69, 70, 71, 72, 73,
  85, 86, 87, 88, 89, 90, 91, 92,
  103, 104, 105, 106, 107, 108, 109, 110].reverse();

const cat4Index = []; //Bottom left petal
const cat5Index = []; //Bottom middle petal
const cat6Index = []; //Bottom right petal

//Single emoji rows, fanning out from center:
const cat7Index = [121, 122, 123, 124, 125, 126, 127, 128, 129]; //Line heading right from center
const cat8Index = [139, 158, 177, 196, 215, 234, 253]; //Line heading right-down from center
const cat9Index = [138, 156, 174, 192, 210, 228, 246]; //Line heading left-down from center
const cat10Index = [119, 118, 117, 116, 115, 114, 113, 112, 111]; //Line heading left from center
const cat11Index = [101, 82, 63, 44, 25, 6]; //Line heading left-up from center
const cat12Index = [102, 84, 66, 48, 30, 12]; //Line heading right-up from center

let imageURLs = new Array(numEmojis);

const Hexgrid = () => {
  const [emojiHistory, setEmojiHistory] = useState([]);
  var iniTileObj = newTileObject([defaultEmojis]);
  const [emojiTiles, setEmojiTiles] = useState(iniTileObj); //
  const tmpTileObj = newTileObject(tempmojis, openmoji.openmojis[3073].hexcode);

  function getTileColour(tileIndex) {
    let colour = 'white';
    if (cat7Index.includes(tileIndex) || cat8Index.includes(tileIndex) || cat9Index.includes(tileIndex) || cat10Index.includes(tileIndex) || cat11Index.includes(tileIndex) || cat12Index.includes(tileIndex)) {
      colour = '#dbf7fd'; //white
    }
    else {
      colour = 'white';//'blue;
    }
    // if (tileIndex <= (center - 1) && tileIndex >= (center - lenHistory)) { //If tile is part of emoji history
    //   colour = '#dbf7fd';//'#d4d4d4';
    // }
    if (tileIndex === center) { //If active emoji tile
      colour = '#a4eefc'; //blue
    }
    return colour;
  }

  function getTileImage(tileIndex, hexcode) {
    let image = ``;

    if (Array.isArray(hexcode)) { //Then hexcode is a blend
      //image = `http://localhost:9000/blends/1F9431F0CF.png`;
      // fetch("http://localhost:9000/blendemojis/" + hexcode[0] + "/" + hexcode[1])
      //   .then(res => res.json())
      //   .then(data => { image = "http://localhost:9000/blends/" + data.url;})
      //   .then(() => { return image })
      //return 'http://localhost:9000/blends/1F9431F0CF.png';
      return image
    }
    else { //it is a single emoji character
      image = "/images/" + hexcode + ".png";
      return image;
    }
  }

  function newTileObject(_emojis, selectedHexcode) {
    let hexcodes = _emojis[0];
    let blendedHexcodes = _emojis[1];
    for (let i = 0; i < hexcodes.length; i++) {
      imageURLs[i] = getTileImage(i, hexcodes[i]);
    }

    /*
    Substitute blendedHexcodes into hexcodes where appropriate
    */
    if (blendedHexcodes !== undefined && blendedHexcodes !== null && selectedHexcode !== undefined) {
      cat1Index.forEach(index => {
        hexcodes[index] = blendedHexcodes[cat1Index.indexOf(index)];
        //console.log(hexcodes[index]);
      });
    }

    /*
    Insert emoji history into active tiles
    */
    if (emojiHistory.length >= 1) {
      for (let i = 0; i < emojiHistory.length; i++) {
        if (center - i - 1 >= (center - lenHistory)) {
          hexcodes[center - i - 1] = emojiHistory[emojiHistory.length - 2 - i];
        }
      }
    }

    // if (emojiHistory.length >= 1) {
    //   values[0][center] = emojiHistory[emojiHistory.length-1];
    //   for (let i = 0; i < emojiHistory.length-1; i++) {
    //     if (center - i -1> 49) {
    //       values[0][center - i - 2] = emojiHistory[emojiHistory.length - 1 - i];
    //     }
    //   }
    // }

    /*
    Map hexcodes to tiles 
    */
    const tileObj = hexcodes.map((hexcode, index) => {
      /*  
      Assign tile colour based on position in grid
      */
      let colour = getTileColour(index);

      /*  
      Assign tile image based on position in grid
      */
      //let image = `/images/1F4EF.svg`;
      //image = imageURLs[index];//getTileImage(index, hexcode); //get image then return tile
      if (Array.isArray(hexcode)) { //Then hexcode is a blend
        //image = `http://localhost:9000/blends/1F9431F0CF.png`;
        // fetch("http://localhost:9000/blendemojis/" + hexcode[0] + "/" + "1F0CF")
        //   .then(res => res.json())
        //   .then(data => { imageURLs[index] = "http://localhost:9000/blends/" + data.url })
        //return 'http://localhost:9000/blends/1F9431F0CF.png';
        //return image
        imageURLs[index] = "/blends/" + hexcode[0] + hexcode[1] + '.png';
      }
      else { //it is a single emoji character
        imageURLs[index] = "/images/" + hexcode + ".png";
      }
      return {
        img: imageURLs[index],
        key: index,
        onClick: (e) => handleClick(index, hexcode, e),
        fill: '',
        styles: {
          normal: {
            fill: colour
          },
          hover: {
            fill: '#6cc7da'
          },
          active: {
            fill: '#779df1'
          }
        }
      }
    })

    return tileObj;
  }

  /*  
  Get random emojis for every tile
  */
  function getRandomHexcodes() {
    return new Promise((resolve, reject) => {
      var obj;
      fetch("/api/randomhexcodes?limit=" + numEmojis.toString())
        .then(res => res.json())
        .then(data => obj = JSON.parse(data))
        .then(() => { resolve(obj); })
    })
  }

  /*  
  Get random blends
  */
  function getRandomBlendHexcodes(hexcode) {
    return new Promise((resolve, reject) => {
      var obj;
      fetch("/api/randomblendhexcodes/" + hexcode + "?limit=" + cat1Index.length.toString())
        .then(res => res.json())
        .then(data => obj = JSON.parse(data))
        .then(() => { resolve(obj); })
    })
  }

  /*  
  Get markov emojis
  */
  function getMarkovHexcodes(hexcode) {
    return new Promise((resolve, reject) => {
      var obj;
      fetch("/api/markovhexcodes/" + hexcode + "?limit=" + cat7Index.length.toString())
        .then(res => res.json())
        .then(data => obj = JSON.parse(data))
        .then(() => { resolve(obj); })
    })
  }

  /*  
Get markov blends
*/
  function getMarkovBlendHexcodes(hexcode, limit) {
    return new Promise((resolve, reject) => {
      var obj;
      fetch("/api/markovblendhexcodes/" + hexcode + "?limit=" + limit.toString())
        .then(res => res.json())
        .then(data => obj = JSON.parse(data))
        .then(() => { resolve(obj); })
    })
  }

  /*
  Update emoji history and remove the oldest entry if length exceeds max.
  */
  function updateEmojiHistory(hexcode, num) {
    let newEmojis = emojiHistory;
    for (let i = 0; i < num; i++) {
      newEmojis.push(hexcode);
      if (newEmojis.length > lenHistory + 1) {
        newEmojis.shift();
      }
    }
    setEmojiHistory(newEmojis);
  }

  function getBlendHexcode(hexcode1, hexcode2) {
    return new Promise((resolve, reject) => {
      var obj;
      if (Array.isArray(hexcode1)) {
        hexcode1 = hexcode1[0];
      }
      if (Array.isArray(hexcode2)) {
        hexcode2 = hexcode2[0];
      }

      fetch("/api/blendemojis/" + hexcode1 + "/" + hexcode2)
        .then(res => res.json())
        .then(() => { obj = [hexcode1, hexcode2]; })
        .then(() => { resolve(obj); })
    })
  }
  function getVarietyHexcodes(hexcode, limit) {
    return new Promise((resolve, reject) => {
      var obj;
      if (Array.isArray(hexcode)) {
        hexcode = hexcode[0];
      }

      fetch("/api/variety/" + hexcode + "?limit=" + limit.toString())
        .then(res => res.json())
        .then(data => { obj = JSON.parse(data); })
        .then(() => { resolve(obj); })
        .catch(error => {
          console.error(error.message)
        });
    })
  }


  const handleClick = (id, hexcode, e) => {
    console.log(hexcode + ' was clicked. ID is ' + id);
    // Promise.all([getVarietyHexcodes(hexcode, numEmojis)]).then((values) => {
    //   console.log("Variety happends");
    //   console.log(values);
    // }).catch(error => {
    //   console.error(error.message)
    // });

    
    if (id === center) {
      var imgURL = '';

      if (Array.isArray(hexcode)) { //Then hexcode is a blend
        imgURL = "/blends/" + hexcode[0] + hexcode[1] + '.png';
      }
      else { //it is a single emoji character
        imgURL = "/images/" + hexcode + ".png";
      }

      saveAs(imgURL, 'blend.png');
    }
    else if (hexcode !== '1F504') {
      updateEmojiHistory(hexcode, 1); //Add clicked emoji to emoji history

      /*
      Replace all emoji with 'loading' that can't be clicked
      */
      setEmojiTiles(tmpTileObj);
      console.log("Hex: " + hexcode);

      //TODO: This is a quick fix, find a way to send both hexcodes and still get blends:
      if (Array.isArray(hexcode)) { //Then hexcode is a blend
        hexcode = hexcode[1]; console.log("BLEND: " + hexcode);
      }

      //Get hexcodes for new tiles, then assign them to tiles:
      Promise.all([getRandomHexcodes(), getRandomBlendHexcodes(hexcode), getMarkovHexcodes(hexcode), getBlendHexcode(hexcode, emojiHistory[emojiHistory.length - 2]), getBlendHexcode(emojiHistory[emojiHistory.length - 2], hexcode), getMarkovBlendHexcodes(hexcode, cat2Index.length), getMarkovBlendHexcodes(hexcode, cat3Index.length)]).then((values) => {
        //Substitute blendedHexcodes into hexcodes where appropriate:
        if (values[1] !== undefined && values[1] !== null && values[2] !== null && hexcode !== undefined) {
          cat1Index.forEach(index => {
            values[0][index] = values[1][cat1Index.indexOf(index)];

          });
          cat7Index.forEach(index => {
            values[0][index] = values[2][cat7Index.indexOf(index)];
          });
          cat2Index.forEach(index => {
            values[0][index] = values[5][cat2Index.indexOf(index)];
          });
          cat3Index.forEach(index => {
            values[0][index] = values[6][cat3Index.indexOf(index)];
          });

        }

        if (emojiHistory[emojiHistory.length - 2] !== '1F504') {
          values[0][100] = values[3]; //Make this one a blend between current and most recent history
          values[0][137] = values[4]; //Make this one a blend between current and most recent history  
          cat1Index.forEach(index => {
            if (index !== 100) {
              values[0][index] = values[0][index + 1];
            }
          });
        }
        // else{
        //   // values[0][100] = values[3][0]; 
        //   // values[0][137] = values[4][1];   
        // }

        //Insert emoji history into active tiles:
        if (emojiHistory.length >= 1) {
          values[0][center] = emojiHistory[emojiHistory.length - 1];
          for (let i = 0; i < emojiHistory.length; i++) {
            if (center - i - 1 >= (center - lenHistory)) {
              values[0][center - i - 1] = emojiHistory[emojiHistory.length - 1 - i];
            }
          }
        }

        var newTileObj;
        const tilePromise = new Promise((resolve, reject) => {
          newTileObj = newTileObject(values, hexcode);
          resolve();
        });
        tilePromise
          .then(() => {
            setEmojiTiles(newTileObj); console.log(values);
          }).catch(error => {
            console.log("Something went wrong with the tilePromise.")
            console.error(error.message)
          });

        //newTileObj = newTileObject(values, hexcode); //gen tiles then return them
      }).catch(error => {
        console.error(error.message)
      });
    }
  }

  /*
  Display the initial emoji options.
  This is occuring twice according to the API terminal
  */
  window.addEventListener('DOMContentLoaded', (event) => {
    const scroll = document.querySelector('.App');
    scroll.scrollLeft = 350;
    scroll.scrollTop = 350;

    /*
      Fill the emoji history with placeholders
    */
    updateEmojiHistory(openmoji.openmojis[3073].hexcode, lenHistory + 1);

    /*
      TODO: Replace this with a call to the getrandoms function
    */
    var obj;
    fetch("/api/randomhexcodes?limit=" + numEmojis.toString())
      .then(res => res.json())
      .then(data => obj = JSON.parse(data))
      .then(() => iniTileObj = newTileObject([obj, []]))
      .then(() => setEmojiTiles(iniTileObj))
      .catch(error => {
        console.log("Something went wrong with the randomhexcodes fetch request.")
        console.error(error.message)
      })
  });

  return (
    <>
      <TiledHexagons
        tileSideLengths={60}
        tileGap={4}
        tileBorderRadii={9}
        maxHorizontal={maxHorizontal}
        tileTextStyles={{
          fontFamily: 'Source Sans Pro',
          fontSize: '68px',
        }}
        tiles={emojiTiles}
        onLoad={() => handleClick()}
      />
    </>
  );
}

export default Hexgrid;