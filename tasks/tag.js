var task = function(gulp, config) {
  'use strict';

  var git = require('gulp-git');
  var fs = require('fs');
  var _ = require('lodash');
  var gutil = require('gulp-util');
  var inquirer = require('inquirer');

  var doTag = function (pkg, cb) {
    git.tag(pkg.version, 'Created Tag for version: ' + pkg.version, function (error) {
      if (error) {
        return cb(error);
      }
      git.push('origin', 'master', {args: '--tags'}, cb);
    });
  };

  var readPackageJson = function () {
    //We parse the json file instead of using require because require caches multiple calls.
    return JSON.parse(fs.readFileSync('./package.json'), 'utf8');
  };

  var analyzeDependencies = function (pkg) {
    var ok = true;
    _.each(pkg.dependencies, function (dep, key) {
      if(/^git.*npolar.*\.git$/.test(dep)) {
        gutil.log('[WARN] About to tag with snapshot version of '+ key +'. You might want to lock to a specific version!');
        ok = false;
      }
    });
    return ok;
  };

  gulp.task('tag', function (cb) {

    var pkg = readPackageJson();

    if (analyzeDependencies(pkg)) {
      doTag(pkg, cb);
    } else {
      inquirer.prompt([{
        type: 'confirm', name: 'tag',
        message: 'You have snapshot versioned dependencies, continue creating tag?',
        default: false}], function (answer) {
          if (answer.tag) {
            doTag(pkg, cb);
          } else {
            cb();
            process.exit(0);
          }
        });
    }

  });
};

module.exports = task;
