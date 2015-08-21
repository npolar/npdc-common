var task = function(gulp, config) {
  'use strict';

  var mocha = require('gulp-mocha');
  var notify = require('gulp-notify');

  gulp.task('test', function () {
    return gulp.src(config.tests, {read: false})
      // gulp-mocha needs filepaths so you can't have any plugins before it
      .pipe(mocha({
        reporter: 'dot'
        }))
      .on('error', notify.onError({message: '<%= error.message %>', title: 'Gulp mocha'}));
  });
};

module.exports = task;
