var express = require("express");
var router = express.Router();
var path = require('path');
var parseString = require('xml2js').parseString;
const fs = require('fs');
const openmoji = require('openmoji');
const Markov = require('node-markov-generator');

var corpus = [];
var generator = new Markov.TextGenerator(corpus);

console.time("corpusprocess");
const getAllSubtitles = function(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllSubtitles(dirPath + "/" + file, arrayOfFiles)
    } else {
      if(file.substr(-4) == '.xml'){
        arrayOfFiles.push(path.join(dirPath, "/", file))
      }
    }
  })

  return arrayOfFiles
}
const subtitles = getAllSubtitles("./OpenSubtitles/xml/en/");
// console.log("There are " + subtitles.length + " files");

function callback () { 
  generator = new Markov.TextGenerator(corpus); 
  console.log('all done'); 
  var file = fs.createWriteStream('corpus.txt');
  file.on('error', function(err) { /* error handling */ });
  corpus.forEach(function(v) { file.write(v + ','); });
  file.end();
  console.timeEnd("corpusprocess");
}
var scriptsProcessed = 0;

subtitles.forEach(script => {
  fs.readFile(script, function (err, data) {
    parseString(data, function (err, result) {
      // if(scriptsProcessed === 330){
      //   console.log("There was an oops at " + script)
      //   console.log("Data looks like: " + result);
      //   console.log("Result looks like: " + result);
      //   console.log(result.document.s);
      // }
      result.document.s.forEach(sentence => { //For each sentence in document
        var strSentence = "";
        var words = [];
        if(sentence.w === undefined && sentence.i === undefined && sentence.b === undefined){
          console.dir("Sentence was wibbly: " + sentence);
          console.log("From script: " + script);
        }
        else{
          if(sentence.w === undefined){
            words = sentence.i;
            if(words === undefined){
              words = sentence.b;
            }
          }
          else{
            words = sentence.w;
          }
          words.forEach(word => { //For each word in sentence
            if (isEmoji(word._) === true) { //If word can be found in OpenMoji
              strSentence = strSentence.concat(word._ + ' ');
            }
          });
          var arrSentence = strSentence.substring(0, strSentence.length - 1).split(' ');
          //console.log(arrSentence.length);
          if(arrSentence.length > 1){
            arrSentence = arrSentence.flatMap((x) => {
              return arrSentence.flatMap((y) => {
                return (x != y) ? [[x,y]] : []
              });
            });
            if(arrSentence.length > 0){
              arrSentence.forEach(ngram => {
                corpus.push(ngram[0].concat(' ', ngram[1]));
              });
            }
          }
  
        }
      });
      //console.log("Corpus: ", corpus); //Completed adding this document to corpus
      //generator = new Markov.TextGenerator(corpus);
      scriptsProcessed++;
      console.log(scriptsProcessed);
      if(scriptsProcessed === subtitles.length) {
        callback();
      }
    
    });
  });
  
});
