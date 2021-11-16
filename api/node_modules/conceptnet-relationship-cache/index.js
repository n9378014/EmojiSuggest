/* global __dirname */

var callNextTick = require('call-next-tick');
var waterfall = require('async-waterfall');
var curry = require('lodash.curry');
var lineChomper = require('line-chomper');
var fs = require('fs');
var iscool = require('iscool')({
  customBlacklist: ['massacre', 'massacres', 'fat', 'voilence', 'midgets', 'midget', 'Osama']
});
var probable = require('probable');
var splitToWords = require('split-to-words');
var detailsForConcepts = require('./details-for-concepts');

function getRandomMap({ relationship, disallowUseEmitters }, getDone) {
  waterfall([pickRandomRelationshipMap, passSet], getDone);

  function passSet(relmap, done) {
    var receivers = relmap.receivingConcepts.filter(eachWordIsCool);
    var emitters = relmap.emittingConcepts.filter(eachWordIsCool);
    if (receivers.length < 2 && emitters.length < 2) {
      // TODO: These should be filtered out in the data files ahead of time.
      callNextTick(
        done,
        new Error(
          `Not enough suitable concepts with relationships to ${
            relmap.concept
          }.`
        )
      );
    } else {
      relmap.receivingConcepts = receivers;
      relmap.emittingConcepts = emitters;
      callNextTick(done, null, relmap);
    }
  }

  function pickRandomRelationshipMap(pickDone) {
    var fromLine = probable.roll(detailsForConcepts[relationship].lineCount);
    var filePath = `${__dirname}/data/conceptnet/${
      relationship
    }-relmaps-offsets.json`;
    //console.log('File path', filePath);

    waterfall([curry(fs.readFile)(filePath, 'utf8'), chomp, passMap], pickDone);

    function chomp(lineOffsetsText, done) {
      lineChomper.chomp(
        `${__dirname}/data/conceptnet/${relationship}-relmaps.ndjson`,
        {
          lineOffsets: JSON.parse(lineOffsetsText),
          fromLine,
          lineCount: 1
        },
        done
      );
    }

    function passMap(lines, done) {
      if (!lines || !Array.isArray(lines) || lines.length < 1) {
        done(new Error('Could not get valid line for line number ' + fromLine));
      } else {
        done(null, JSON.parse(lines[0]));
      }
    }
  }
}

function eachWordIsCool(phrase) {
  return splitToWords(phrase).every(iscool);
}

module.exports = { getRandomMap };
