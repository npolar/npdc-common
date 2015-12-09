var task = function (gulp, config) {
    'use strict';

    // Registers gulp task
    gulp.task('shared-libs', ['views', 'revParse'], function () {
      var gulpif = require('gulp-if');
      var gutil = require('gulp-util');
      var sourcemaps = require('gulp-sourcemaps');
      var source = require('vinyl-source-stream');
      var buffer = require('vinyl-buffer');
      var browserify = require('browserify');
      var uglify = require('gulp-uglify');
      var errorHandler = require('npdc-gulp/util/errorHandler')({plugin: 'browserify', verbose: true});
      var resolutions = require('browserify-resolutions');
      var rename = require('gulp-rename');


      var app = config.pkg.main;
      var bundle;

      var bundler = browserify({
          // Our app main
          entries: [app],
          // Enable source maps
          debug: true
      }).plugin(resolutions, ['angular']);

      bundler.on('log', gutil.log);

      var templateCache = '/tmp/npdc-gulp/' + config.name + '/templates.js';
      gutil.log("templateCache", templateCache);
      bundler.add(templateCache);

      bundler.require([{file: './' + app, expose: 'npdc-common'}, 'angular']);

      bundle = function (ids) {
          var bundleName = config.pkgname + '-' + config.version().split('.')[0] + '.js';
          gutil.log('Bundling', ids instanceof Array ? ids : '');

          // Browseriy
          return bundler.bundle()
            // log errors if they happen
            .on('error', errorHandler)
            .pipe(source(bundleName))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(gulpif(global.isProd, uglify({ compress: { drop_console: true } })))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(config.dist.sharedAssets))
            .pipe(rename(config.pkgname + '-' + global.ref + '-latest.js'))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(config.dist.sharedAssets));
      };

      return bundle();
    });
};

module.exports = task;
