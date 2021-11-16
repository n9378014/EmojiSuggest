/* global __dirname, process */

var fs = require('fs');
var ndjson = require('ndjson');

if (process.argv.length < 3) {
  console.log(
    'Usage: node tools/count-relationships-by-concept.js <relationships.ndjson>'
  );
  process.exit();
}

var countsByStartingLetter = {};
var countsByConcept = {};
var relationshipsFile = process.argv[2];

fs
  .createReadStream(relationshipsFile)
  // .pipe(process.stdout)
  .pipe(ndjson.parse())
  .on('data', storeRelationship)
  .on('end', processCounts);

function storeRelationship(entry) {
  countKey(countsByConcept, entry.start.label);
  countKey(countsByConcept, entry.end.label);
}

function countKey(dict, key) {
  var value = dict[key];
  if (value === undefined) {
    value = 1;
  } else {
    value += 1;
  }
  dict[key] = value;
}

function processCounts() {
  console.log('Counts by concept:');
  console.log(JSON.stringify(countsByConcept));

  for (var concept in countsByConcept) {
    let startingLetter = concept.charAt(0).toLowerCase();
    if (concept.startsWith('a ') && concept.length > 2) {
      startingLetter = concept.charAt(2);
    } else if (concept.startsWith('an ') && concept.length > 3) {
      startingLetter = concept.charAt(3);
    }
    countKey(countsByStartingLetter, startingLetter.toLowerCase());
  }

  console.log('Counts by starting letter:');
  console.log(JSON.stringify(countsByStartingLetter, null, 2));
}
