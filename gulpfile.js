"use strict";

var gulp = require('gulp');
var npdcGulp = require('npdc-gulp');
var config = npdcGulp.baseConfig;
npdcGulp.loadModuleTasks(gulp);

gulp.task('copy-deps-assets', ['clean'], function () {
  return gulp.src(['node_modules/npdc-material/dist/img/*', 'node_modules/npdc-material/dist/*.css'], { base: 'node_modules/npdc-material/dist' })
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('default', ['copy-deps-assets', 'lint', 'test']);
gulp.watch([].concat(config.src.js, config.tests), ['lint', 'test']);
