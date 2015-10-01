var task = function(gulp, config) {
  'use strict';

  var mocha = require('gulp-mocha');
  var notify = require('gulp-notify');
  var istanbul = require('gulp-istanbul');

  gulp.task('pre-test', function() {
    return gulp.src(config.src.jsNoTests)
      // Covering files
      .pipe(istanbul({includeUntested: true}))
      // Force `require` to return covered files
      .pipe(istanbul.hookRequire());
  });

  gulp.task('test', ['pre-test'], function(done) {
    return gulp.src(config.tests, {
        read: false
      })
      // gulp-mocha needs filepaths so you can't have any plugins before it
      .pipe(mocha({
        reporter: 'dot'
      }))
      .on('error', function (error) {
        notify({
          message: '<%= error.message %>',
          title: 'Gulp mocha'
        }).write(error);
        this.emit('end');
      })
      .pipe(istanbul.writeReports({
        reporters: ['text-summary', 'lcov']
      }));
  });
};

module.exports = task;
