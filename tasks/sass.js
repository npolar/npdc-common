var task = function(gulp, config) {
  'use strict';

  var sass = require('gulp-sass');
  var nodeSassGlobbing = require('node-sass-globbing');
  var es = require('event-stream');
  var concat = require('gulp-concat');

  gulp.task('sass', function () {
    var vendorFiles = gulp.src(config.deps.css);
    var compiledFiles = gulp.src(config.src.sassMain)
      .pipe(sass({importer: nodeSassGlobbing}).on('error', sass.logError));

    return es.concat(vendorFiles, compiledFiles)
      .pipe(concat('npdc-ui.css'))
      .pipe(gulp.dest(config.dist.root));
  });
};

module.exports = task;
