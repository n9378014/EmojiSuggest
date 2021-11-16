/* global process */

var poolConceptnetRequest = require('../pool-conceptnet-request');

if (process.argv.length < 3) {
  console.log(
    'Usage: node tools/get-conceptnet-relationship.js <relationship, e.g. PartOf>'
  );
  process.exit();
}

var relationshipPath = `r/${process.argv[2]}`;
poolConceptnetRequest(relationshipPath, printResponse);

function printResponse(error, edges) {
  if (error) {
    console.error(error);
  } else {
    console.log(edges.map(JSON.stringify).join('\n'));
  }
}
