conceptnet-relationship-cache
==================

Some relationships cached from ConceptNet, for quick and easy use. Not necessarily up-to-date, however, and with abbreviated relationship objects.

Installation
------------

npm install --save conceptnet-relationship-cache

Usage
-----

This package contains a set of line-delimited JSON data files, one for each category. Each of those contains an accompanying offsets JSON file that you can use to get a line from the data via random access using [line-chomper](https://npmjs.com/package/line-chomper).

A line in a data file looks like this:

    {"concept":"Corner","rel":"AtLocation","emittingConcepts":["180 Degrees","Bad Boy","Bad Child","Bored Child","Cabinet","Chair","Chess Rook","Child With Time Out","Cobb Webs","Corner Cabinet","Corner Shop","Dennis Menace","Dirt","Dunce","Dust","Dust Bunnies","Ficus","Floor Boards","Intersection of Three Planes","Intersection of Two Walls","Lamp","Little Jack Horner","Naughty Child","News Vendor","Punished Child","Right Angle","Shelf","Sign Post","Spider Web","Spider Webs","Stool","Table","Toys","Trash Can","Trash Receptacle","Wall","Walls"],"receivingConcepts":["Street Corner"]}

It lists a `concept`, the relationship (`rel`), and:

- `receivingConcepts`: Concepts that "receive" the relationship from this concept. e.g. "Street Corner" receives "AtLocation" from "Corner". Or in more natural language, the corner is at the street corner. (Sometimes, ConceptNet does not make perfect sense.)

- `emittingConcepts`: Concepts that "emit" the relationship to this concept. e.g. "Child With Time Out" emits "AtLocation" to "Corner". Or in more natural language, the child with time out is at the corner.

They're located at `node_modules/conceptnet-relationship-cache/data/conceptnet`.

However, you can also get a random entry for a given category like so:

    var cache = require('conceptnet-relationship-cache');

    cache.getRandomMap(
      { category: 'AtLocation' },
      logRel
    );

    function logRel(error, entry) {
      if (error) {
        console.log(error, error.stack);
      } else {
        console.log(entry);
      }
    }

Output will be a data file entry, like the example above. 

License
-------

The MIT License (MIT)

Copyright (c) 2018 Jim Kang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
