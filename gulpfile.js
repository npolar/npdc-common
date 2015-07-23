'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var watch = require('gulp-watch');
var del = require('del');
var reload = browserSync.reload;
var DEST = './dist';

var handleError = function (err) {
  console.log(err.toString());
  this.emit('end');
};

// JavaScript tasks
gulp.task('compile-js', ['clean-js'], function () {
  return gulp.src(['./src/js/**/*.js'])
    .pipe(concat('npolar-css.js'))
    .pipe(gulp.dest(DEST + '/js'))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(DEST + '/js'));
});

gulp.task('validate-js', [], function () {
  return gulp.src(['./src/js/**/*.js'])
    .pipe(jshint({ multistr: true }))
    .pipe(jshint.reporter('default'));
});

gulp.task('test-js', [], function () {
  return gulp.src(['./test/js/**/*.js'])
    .pipe(mocha({ reporter: 'spec' }));
});

// Reload
gulp.task('live-server', ['compile-less'], function () {
  browserSync({ server: { baseDir: '.' }});
});

// Watch
gulp.task('watch', ['live-server', 'copyfonts'], function () {
  watch(['*.html', DEST + '/css/**/*.css', 'src/js/**/*.js'], reload);
  watch(['./src/less/**/*.less'], function () {
    gulp.start('compile-less');
  });

});

// Less tasks
gulp.task('compile-less', ['clean-css'], function () {
  return gulp.src('./src/less/main.less')
    .pipe(sourcemaps.init())
    .pipe(less().on('error', handleError))
    .pipe(minifyCSS())
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest(DEST + '/css'));
});

gulp.task('clean-js', [], function (cb) {
  del([DEST + '/js'], cb);
});

gulp.task('clean-css', [], function (cb) {
  del([DEST + '/css'], cb);
});

gulp.task('copyfonts', function() {
   return gulp.src('./node_modules/bootstrap/dist/fonts/**/*')
   .pipe(gulp.dest(DEST + '/fonts'));
});

gulp.task('default', [
  'validate-js', 'test-js',
  'compile-js', 'compile-less',
  'live-server', 'watch']);
