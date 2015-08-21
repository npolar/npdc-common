var task = function(gulp, config) {
  'use strict';

  var changed = require('gulp-changed');

  gulp.task('copy-html', function() {
    return gulp.src(config.src.html)
      .pipe(changed(config.dist.root))
      .pipe(gulp.dest(config.dist.root));
  });

  gulp.task('copy-static', function() {
    return gulp.src(config.src.img)
      .pipe(changed(config.dist.root))
      .pipe(gulp.dest(config.dist.root));
  });

  gulp.task('copy-demo', function() {
    return gulp.src([].concat(config.src.demo, config.deps.demo))
      .pipe(changed(config.dist.root))
      .pipe(gulp.dest(config.dist.root));
  });

  gulp.task('copy-all', ['copy-html', 'copy-static', 'copy-demo']);
};

module.exports = task;
