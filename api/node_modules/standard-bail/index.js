function StandardBail(createOpts) {
  var log;

  if (createOpts) {
    log = createOpts.log;
  }

  function createStandardBailCallback(success, outerCallback) {
    return function standardBailCallback(error) {
      if (error) {
        if (log) {
          if (error.stack) {
            log(error, error.stack);
          }
          else {
            log(error);
          }
        }
        if (outerCallback) {
          outerCallback(error);
        }
      }
      else if (success) {
        var successArgs = Array.prototype.slice.call(arguments, 1);
        if (outerCallback) {
          successArgs .push(outerCallback);
        }
        success.apply(success, successArgs);
      }
    };
  }

  return createStandardBailCallback;
}

module.exports = StandardBail;
