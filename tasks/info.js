var task = function(gulp, config) {
  'use strict';

  var gutil = require('gulp-util');
  var fs = require('fs');
  var path = require('path');

  gulp.task('info', function (cb) {
    // Watch assets if 'npm link'ed
    fs.readdirSync(config.deps.root).forEach(function (file) {
      var stats = fs.lstatSync(path.join(config.deps.root, file));
      if (stats.isSymbolicLink()) {
        gutil.log(gutil.colors.yellow('Using symlinked version of ' + file));
      }
    });
    cb();
  });
};

module.exports = task;
