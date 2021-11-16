/* global process */

var fs = require('fs');
var split = require('split');
var through2 = require('through2');
var toTitleCase = require('titlecase');

var underscoreRegex = /_/g;

if (process.argv.length < 3) {
  console.log(
    'Usage: node tools/filter-conceptnet-csv.js <conceptnet-assertions-5.6.0.csv> > filtered.ndjson'
  );
  process.exit();
}

var relationshipsFile = process.argv[2];

var unwantedTypes = [
  '/r/RelatedTo',
  '/r/ExternalURL',
  '/r/FormOf',
  '/r/Synonym',
  '/r/Antonym',
  '/r/DerivedFrom',
  '/r/HasContext',
  '/r/SimlarTo',
  '/r/EtymologicallyRelatedTo',
  '/r/EtymologicallyDerivedFrom'
];

fs
  .createReadStream(relationshipsFile)
  .pipe(split())
  .pipe(through2({ objectMode: true }, passIfOK))
  .pipe(process.stdout);

function passIfOK(line, enc, done) {
  var [uri, relation, start, end, info] = line.split('\t');
  if (
    relation &&
    start &&
    end &&
    (start.startsWith('/c/en/') || end.startsWith('/c/en/')) &&
    unwantedTypes.indexOf(relation) === -1
  ) {
    done(
      null,
      JSON.stringify({
        rel: relation.substr(3),
        start: deriveLabel(start),
        end: deriveLabel(end)
      }) + '\n'
    );
  } else {
    done();
  }
}

function deriveLabel(path) {
  return toTitleCase(path.split('/')[3].replace(underscoreRegex, ' '));
}
