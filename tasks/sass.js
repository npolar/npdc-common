var task = function(gulp, config) {
  'use strict';

  var sass = require('gulp-sass');
  var cssGlobbing = require('gulp-css-globbing');
  var es = require('event-stream');
  var concat = require('gulp-concat');
  var notify = require('gulp-notify');

  gulp.task('sass', function () {
    var vendorFiles = gulp.src(config.deps.css);
    var compiledFiles = gulp.src(config.src.sassMain)
      .pipe(cssGlobbing({extensions: ['.scss']}))
      .pipe(sass().on('error', sass.logError));

    return es.concat(vendorFiles, compiledFiles)
      .pipe(concat('npdc-material.css'))
      .pipe(gulp.dest(config.dist.root))
      .on('error', notify.onError({message: '<%= error.message %>', title: 'Gulp sass'}));
  });
};

module.exports = task;
