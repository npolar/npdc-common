var task = function(gulp, config) {
  'use strict';

  var del    = require('del');

  gulp.task('clean', function(cb) {
    del([config.dist.root], { force: true }, cb);
  });
};

module.exports = task;
