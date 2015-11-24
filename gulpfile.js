"use strict";

var gulp = require('gulp');
var npdcGulp = require('npdc-gulp');
var runSequence = require('run-sequence').use(gulp);
var changed = require('gulp-changed');

var config = require('./config')(npdcGulp.baseConfig);

npdcGulp.loadModuleTasks(gulp, config);
config = npdcGulp.baseConfig;
require('./shared-libs')(gulp, config);

gulp.task('copy-assets', function() {
  return gulp.src(config.src.assets, { ignore: '**/demo/**' })
    .pipe(changed(config.dist.sharedAssets))
    .pipe(gulp.dest(config.dist.sharedAssets));
});

gulp.task('copy-demo', function() {
  return gulp.src(config.src.root+'/**/demo/**')
    .pipe(changed(config.dist.approot))
    .pipe(gulp.dest(config.dist.approot));
});

gulp.task('watch-demo', function () {
  gulp.watch(config.src.root+'/**/demo/**', function () { runSequence('copy-demo');});
});

gulp.task('default', function (cb) {
  runSequence(['clean', 'info'], 'lint', 'test', ['sass', 'browserify', 'copy-all',
    'copy-demo', 'copy-shared-assets'], 'browserSync', ['watch-all', 'watch-demo'], cb);
});

gulp.task('prod', function (cb) {
  global.isProd = true;
  runSequence(['clean', 'info'], 'lint', 'test', ['sass', 'shared-libs', 'copy-assets',
    'copy-deps-assets', 'copy-shared-assets'], cb);
});
