"use strict";

var gulp = require('gulp');
var npdcGulp = require('npdc-gulp');

npdcGulp.loadModuleTasks(gulp);

gulp.task('copy-deps-assets', function () {
  return gulp.src(['node_modules/npdc-material/dist/img/*'], { base: 'node_modules' })
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('default', ['lint', 'test', 'copy-deps-assets']);
