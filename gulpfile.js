"use strict";

var gulp = require('gulp');
var npdcGulp = require('npdc-gulp');
var runSequence = require('run-sequence');
var baseConfig = npdcGulp.baseConfig;
npdcGulp.loadModuleTasks(gulp, {
  'deps': {
    'css': ['node_modules/npdc-material/dist/*.css'].concat(baseConfig.deps.css)
  },
  'dist': {
    'approot': baseConfig.dist.root + '/assets'
  }
});

gulp.task('copy-deps-assets', function () {
  return gulp.src(['node_modules/npdc-material/dist/img/**/*'], { base: 'node_modules/npdc-material/dist' })
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('default', function (cb) {
  runSequence('clean', ['copy-deps-assets', 'copy-static', 'copy-css', 'lint', 'test'], ['watch-css', 'watch-test', 'watch-static'], cb);
});

gulp.task('prod', function (cb) {
  global.isProd = true;
  runSequence('clean', ['copy-deps-assets', 'copy-static', 'copy-css', 'lint', 'test'], cb);
});
