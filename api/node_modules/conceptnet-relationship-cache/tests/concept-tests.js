var test = require('tape');
var assertNoError = require('assert-no-error');
var cache = require('../index');

test('Get random relationship', testRandom);

function testRandom(t) {
  cache.getRandomMap({ relationship: 'AtLocation' }, checkRel);

  function checkRel(error, entry) {
    assertNoError(t.ok, error, 'No error while getting random entry.');
    console.log(entry);
    t.ok(entry.concept, 'Entry has a concept.');
    t.ok(entry.rel, 'Entry has a relationship.');
    t.ok(Array.isArray(entry.emittingConcepts), 'Entry has emittingConcepts.');
    t.ok(
      Array.isArray(entry.receivingConcepts),
      'Entry has receivingConcepts.'
    );
    t.end();
  }
}
