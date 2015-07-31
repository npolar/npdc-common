var task = function(gulp, config) {
  'use strict';

  var git = require('gulp-git');
  var bump = require('gulp-bump');
  var gutil = require('gulp-util');
  var runSequence = require('run-sequence').use(gulp);
  var inquirer = require('inquirer');

  gulp.task('bump-version', function (cb) {

    inquirer.prompt([{
      type: 'list',
      name: 'change',
      message: 'Is this a patch, minor or major change?',
      choices: ['patch', 'minor', 'major'],
      default: 0
    }], function (answer) {
      gulp.src(['./package.json'])
        .on('error', gutil.log)
        .pipe(bump({type: answer.change}))
        .pipe(gulp.dest('./'));
        cb();
      });
  });


  gulp.task('commit-changes', function () {
    return gulp.src('./package.json')
      .on('error', gutil.log)
      .pipe(git.commit('[Prerelease] Bumped version number'));
  });

  gulp.task('push-changes', function (cb) {
    git.push('origin', 'master', cb);
  });

  gulp.task('bump', function (cb) {
    runSequence(
      'bump-version',
      'commit-changes',
      'push-changes', cb);
  });
};

module.exports = task;
