var request = require('request');
var callNextTick = require('call-next-tick');

const baseURL = 'http://api.conceptnet.io/';

function poolConceptnetRequest(conceptNetPath, poolDone) {
  var items = [];

  makeNextRequest(conceptNetPath);

  function makeNextRequest(nextPagePath) {
    console.error(`Getting ${baseURL + nextPagePath}.`);
    request(
      { method: 'GET', json: true, url: baseURL + nextPagePath },
      processResponse
    );
  }

  function processResponse(error, res, body) {
    if (error) {
      poolDone(error, items);
    } else {
      items = items.concat(body.edges);
      if (body.view.nextPage && body.view.paginatedProperty === 'edges') {
        callNextTick(makeNextRequest, body.view.nextPage);
      } else {
        poolDone(error, items);
      }
    }
  }
}

module.exports = poolConceptnetRequest;
