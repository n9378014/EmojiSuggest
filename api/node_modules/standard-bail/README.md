standard-bail
==================

[![Build Status](https://travis-ci.org/jimkang/standard-bail.svg?branch=master)](https://travis-ci.org/jimkang/standard-bail)

Makes callbacks that log and/or call the outer callback if there's an error so that you don't have to. An abstraction of the most typical kind of error handling callback.

It creates a callback that checks for an error and if there is one, it (optionally) logs it and (optionally) passes it back to the `done` function. If there isn't, it calls the success handler function you've defined.

Basically, you get to skip writing 

    if (error) {
      log(error, error.stack);
      outerDone(error);
    }
    else {
      …
    }

and get to just write whatever was in the else. (Obviously, don't use this if you have to handle an error in a special or different way.)

It's just a way to DRY up callbacks a bit.

Installation
------------

    npm install standard-bail

Usage
-----

Instead of:

    function doAThing(outerDone) {
      someAPI(aCallback);

      function aCallback(error, result, otherThing) {
        if (error) {
          log(error, error.stack);
          outerDone(error);
        }
        else {
          // Use result and otherThing in case in which someAPI call succeeded.
        }
      }

You can do:

    var StandardBail = require('standard-bail');
    var sb = StandardBail({
      log: myLogFunction // optional
    });

    function doAThing(outerDone) {
      someAPI(sb(successHandler, outerDone));

      function successHandler(result, otherThing, done) {
          // Use result and otherThing in case in which someAPI call succeeded.
      }
    }

Here, `successHandlers` doesn't worry about errors. `sb` will have already handled it in a way a jillion other errors are handled: by logging it and/or passing it to `done`.

`StandardBail` takes an opts object that currently has one property: `log`. Use it to tell it which function, if any, it should be logging with. The function should be ready to be passed two parameters: a message string and an error stack. It returns an `sb` function you can use to create your callbacks.

`sb` has two parameters, success and outerDone.

All are optional can be undefined or null. You really should have either a outerDone or a log, though, in order to avoid silent failures.

`success` will be passed all of the non-error parameters passed to the callback as well as whatever `outerDone` you provided.

Tests
-----

Run tests with `make test`.

License
-------

The MIT License (MIT)

Copyright (c) 2016 Jim Kang

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
