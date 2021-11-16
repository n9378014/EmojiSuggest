/* global process */

var fs = require('fs');
var ndjson = require('ndjson');
var queue = require('d3-queue').queue;

var slashRegex = /\//g;

if (process.argv.length < 4) {
  console.log(
    'Usage: node tools/make-relationship-maps.js <relationships.ndjson> <output dir for relmaps>'
  );
  process.exit();
}

var relsByConceptByRelType = {};
var relationshipsFile = process.argv[2];
var outputDir = process.argv[3];

fs
  .createReadStream(relationshipsFile)
  .pipe(ndjson.parse())
  .on('data', storeRelationship)
  .on('end', writeDictEntries);

function storeRelationship(entry) {
  addValueToRelationshipMap(true, entry);
  addValueToRelationshipMap(false, entry);
}

function addValueToRelationshipMap(useEmittingToReceivingDirection, entry) {
  const srcProp = useEmittingToReceivingDirection ? 'start' : 'end';
  const targetProp = useEmittingToReceivingDirection ? 'end' : 'start';
  const sourcesProp = useEmittingToReceivingDirection
    ? 'emittingConcepts'
    : 'receivingConcepts';
  const targetsProp = useEmittingToReceivingDirection
    ? 'receivingConcepts'
    : 'emittingConcepts';

  const src = entry[srcProp];
  const target = entry[targetProp];

  var relsByConcept = relsByConceptByRelType[entry.rel];
  if (!relsByConcept) {
    relsByConcept = {};
    relsByConceptByRelType[entry.rel] = relsByConcept;
  }
  var value = relsByConcept[src];
  if (!value) {
    value = {
      concept: src,
      rel: entry.rel
    };
    value[targetsProp] = [];
    value[sourcesProp] = [];
    relsByConcept[src] = value;
  }
  if (value[targetsProp].indexOf(target) === -1) {
    value[targetsProp].push(target);
  }
}

function writeDictEntries() {
  var q = queue(1);
  for (var rel in relsByConceptByRelType) {
    q.defer(writeConceptEntries, rel);
  }
  q.awaitAll(handleError);
}

function writeConceptEntries(rel, done) {
  var relsByConcept = relsByConceptByRelType[rel];
  var ndjsonWriteStream = ndjson.stringify();
  ndjsonWriteStream.pipe(
    fs.createWriteStream(
      `${outputDir}/${rel.replace(slashRegex, '_')}-relmaps.ndjson`
    )
  );

  for (var concept in relsByConcept) {
    let entry = relsByConcept[concept];
    debugger;
    if (
      entry.receivingConcepts.length > 1 ||
      entry.emittingConcepts.length > 1
    ) {
      ndjsonWriteStream.write(entry);
    }
  }

  ndjsonWriteStream.end(done);
}

function handleError(error) {
  console.error(error);
}
