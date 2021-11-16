/* global process */

function makeCallbackCaller(cb, paramsForCallback) {
  return callbackCall;

  function callbackCall() {
    cb.apply(cb, paramsForCallback);
  }
}

// This does not use Array.prototype.slice.call on `arguments` because V8 does not
// know how to optimize one function's `arguments` being used outside that function.

// Expecting params cb, error, result1, result2, ...
function callNextTick() {
  var argsLength = arguments.length;
  var cb;
  var paramsForCallback;
  var caller;

  if (argsLength > 0) {
    cb = arguments[0];
    paramsForCallback = new Array(argsLength - 1);
    for (var i = 1; i < argsLength; ++i) {
      paramsForCallback[i - 1] = arguments[i];
    }

    caller = makeCallbackCaller(cb, paramsForCallback);
    process.nextTick(caller);
  }
  else {
    throw new Error('No callback provided to callNextTick.');
  }
}

module.exports = callNextTick;
