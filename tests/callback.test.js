var tracker = require('../index.js');
var assert = require('assert');
var minilog = require('minilog');
var verbose = false;

if (verbose) {
  minilog.pipe(minilog.backends.nodeConsole).format(minilog.backends.nodeConsole.formatWithStack);
}

module.exports.Tracker = {
  'should not call initial callback until all subsequent callbacks have been completed': function(done) {
    var calls = 0, expected = 10, created = 0;
    var track = tracker.create('done', function() {
      assert.equal(calls, expected);
      done();
    });
    var increment = function() {
      ++calls;
    };

    for (; created < expected; ++created) {
      setTimeout(track('tracker #' + created, increment), 100);
    }
  }
};
