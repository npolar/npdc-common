var task = function(gulp, config) {
  'use strict';

  var runSequence = require('run-sequence').use(gulp);

  gulp.task('dev', function(cb) {
    runSequence(['clean', 'info'], 'lint', 'test', ['sass', 'browserify', 'copy-all'], 'watch', cb);
  });
};

module.exports = task;
