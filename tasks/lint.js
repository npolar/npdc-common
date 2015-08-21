var task = function(gulp, config) {
  'use strict';

  var jshint = require('gulp-jshint');
  var fs = require('fs');
  var path = require('path');
  var notify = require('gulp-notify');
  //notify.logLevel(0);

  var jshintrc = JSON.parse(fs.readFileSync(path.join(__dirname, '../.jshintrc')));

  gulp.task('lint', function() {
    return gulp.src(config.src.jsAll)
      .pipe(jshint(jshintrc))
      .pipe(jshint.reporter('jshint-stylish'))
      .pipe(notify(function (file) {
        if (file.jshint.success) {
          return false;
        }

        var errors = file.jshint.results.map(function (data) {
          if (data.error) {
            return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
          }
        }).join("\n");
        return {
          message: file.relative + " (" + file.jshint.results.length + " errors)\n" + errors,
          title: 'Gulp jshint'};
      }));
      //.pipe(jshint.reporter('fail'));
  });
};

module.exports = task;
