var task = function(gulp, config) {
  'use strict';

  var watch = require('gulp-watch');
  var runSequence = require('run-sequence').use(gulp);

  gulp.task('watch', ['browserSync'], function() {

    // Scripts are automatically watched and rebundled by Watchify inside Browserify task
    watch(config.src.html, function () { runSequence('copy-html');});
    watch(config.src.img, function () { runSequence('copy-static');});
    watch(config.src.jsAll, function () { runSequence(['lint', 'test']);});
    watch(config.src.sassAll, function () { runSequence('sass');});
    watch(config.src.demo, function () { runSequence('copy-demo');});
  });
};

module.exports = task;
