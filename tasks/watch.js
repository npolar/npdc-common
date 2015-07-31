var task = function(gulp, config) {
  'use strict';

  gulp.task('watch', ['browserSync'], function() {

    // Scripts are automatically watched and rebundled by Watchify inside Browserify task
    gulp.watch(config.src.html, ['copy-html']);
    gulp.watch(config.src.img, ['copy-static']);
    gulp.watch(config.src.jsAll, ['lint', 'test']);
    gulp.watch(config.src.sass, ['sass']);
  });
};

module.exports = task;
