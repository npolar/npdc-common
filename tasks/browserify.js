var task = function(gulp, config) {
  'use strict';

  var gutil = require('gulp-util');
  var sourcemaps = require('gulp-sourcemaps');
  var source = require('vinyl-source-stream');
  var buffer = require('vinyl-buffer');
  var watchify = require('watchify');
  var browserify = require('browserify');
  var notify = require('gulp-notify');
  var glob = require('glob');

  var bundle;
  var bundler = browserify({
    // Our scripts
    entries: [].concat(require.resolve('babelify/polyfill'), glob.sync(config.src.jsDemo)),
    // Enable source maps
    debug: true
  }, watchify.args);

  bundler.add('/tmp/demo_templates.js');
  bundler.on('log', gutil.log);

  bundle = function (ids) {
    gutil.log('Bundling', ids instanceof Array ? ids : '');

    // Browseriy
    return bundler.bundle()
      // log errors if they happen
      .on('error', notify.onError({message: '<%= error.message %>', title: 'Gulp browserify'}))
      .pipe(source('demos.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(config.dist.root));
  };

  // Watch for changes and rebuild
  bundler = watchify(bundler);
  bundler.on('update', function (ids) {
    // Ignore package.json updates
    if (ids.length === 1 && /package\.json$/.test(ids[0])) {
      return;
    }
    return bundle(ids);
  });

  // Registers gulp task
  gulp.task('browserify',['views'], bundle);
};

module.exports = task;
