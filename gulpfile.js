"use strict";

var gulp = require('gulp');
var npdcGulp = require('npdc-gulp');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var cssGlobbing = require('gulp-css-globbing');
var es = require('event-stream');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var watch = require('gulp-watch');
var changed = require('gulp-changed');
var gulpif = require('gulp-if');
var git = require('gulp-git');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var debug = require('gulp-debug');

var baseConfig = npdcGulp.baseConfig;
var config = {
  deps: {
    css: [
      baseConfig.deps.root+'/angular-material/angular-material.css',
      '../angular-material/angular-material.css',
      baseConfig.deps.root+'/jusas-angularjs-slider/dist/rzslider.css',
      '../jusas-angularjs-slider/dist/rzslider.css'
    ].concat(baseConfig.deps.css)
  },
  dist: {
    approot: baseConfig.dist.root + '/demo',
    bundleName: 'demos.js',
    assets: baseConfig.dist.root + '/assets'
  },
  src: {
    app: baseConfig.src.root+'/**/*Demo.js',
    sassMain: [baseConfig.src.root+'/main.scss'],
    sassAll: [baseConfig.src.root+'/**/*.scss'],
    html: [baseConfig.src.root+'/**/index.html'],
    config: []
  },
  dirListings: true,
  templateRoot: 'npdc-common/src'
};
npdcGulp.loadModuleTasks(gulp, config);

gulp.task('sass', function (cb) {
  console.log('conf', config.deps.css);
  git.revParse({
    args: '--abbrev-ref HEAD', quiet: true
  }, function(err, ref) {
    var vendorFiles = gulp.src(config.deps.css);
    var compiledFiles = gulp.src(config.src.sassMain)
      .pipe(cssGlobbing({extensions: ['.scss']}))
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(sourcemaps.write());

    es.concat(vendorFiles, compiledFiles)
      .pipe(debug())
      .pipe(sourcemaps.init())
      .pipe(concat(baseConfig.pkgname + '-' + baseConfig.version() + '.css'))
      .pipe(gulpif(global.isProd, minifyCss()))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(baseConfig.dist.assets)).pipe(rename(baseConfig.pkgname + '-' + ref + '-latest.css'))
      .pipe(gulp.dest(baseConfig.dist.assets))
      .on('error', notify.onError({message: '<%= error.message %>', title: 'Gulp sass'}));
      cb();
  });
});

gulp.task('watch-sass', function () {
  watch(config.src.sassAll, function () { runSequence('sass');});
});

gulp.task('copy-assets', function() {
  return gulp.src(baseConfig.src.img, { ignore: '**/demo/**' })
    .pipe(changed(baseConfig.dist.assets))
    .pipe(gulp.dest(baseConfig.dist.assets));
});

gulp.task('watch-assets', function () {
  watch(baseConfig.src.img, function () { runSequence('copy-assets');});
});

gulp.task('copy-demo', function() {
  return gulp.src(baseConfig.src.root+'/**/demo/**')
    .pipe(changed(baseConfig.dist.approot))
    .pipe(gulp.dest(baseConfig.dist.approot));
});

gulp.task('watch-demo', function () {
  watch(baseConfig.src.root+'/**/demo/**', function () { runSequence('copy-demo');});
});

gulp.task('default', function (cb) {
  runSequence(['clean', 'info'], 'lint', 'test', ['sass', 'browserify', 'copy-assets', 'copy-html', 'copy-demo'],
    'browserSync', ['watch-html', 'watch-views', 'watch-test', 'watch-deps', 'watch-sass', 'watch-demo', 'watch-assets'], cb);
});

gulp.task('prod', function (cb) {
  global.isProd = true;
  runSequence(['clean', 'info'], 'lint', 'test', ['sass', 'copy-all'], cb);
});
