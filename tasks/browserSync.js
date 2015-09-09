var task = function(gulp, config) {
  'use strict';

  var browserSync = require('browser-sync').create();

  gulp.task('browserSync', function() {

    browserSync.init({
      server: {
        // Serve both project root and dist to enable sourcemaps
        baseDir: [config.dist.root],
        directory: true
      },
      // Watch for updates in dist
      files: [config.dist.root+'/**/*'],
      // Disable input mirroring between connected browsers
      ghostMode: false,
      open: false,
      reloadDelay: 500
    });

  });
};

module.exports = task;
