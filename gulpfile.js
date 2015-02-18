var gulp = require('gulp');
var browserSync = require('browser-sync');
var less = require('gulp-less');
var path = require('path');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
var del = require('del');
var reload = browserSync.reload;
var DEST = './dist';

// JavaScript tasks
gulp.task('compile-js', ['clean'], function() {
  return gulp.src(['./src/js/**/*.js'])
    .pipe(concat('npolar-css.js'))
    .pipe(gulp.dest(DEST))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(DEST));
});

gulp.task('validate-js', [], function() {
  return gulp.src(['./src/js/**/*.js'])
    .pipe(jshint({ multistr: true }))
    .pipe(jshint.reporter('default'));
});

gulp.task('test-js', [], function() {
  return gulp.src(['./test/js/**/*.js'])
    .pipe(mocha({ reporter: 'spec' }));
});

// Reload
gulp.task('live-server', [], function() {
  browserSync({ server: { baseDir: '.' }});
  gulp.watch(['*.html', DEST + '/**/*', 'src/js/**/*.js'], {cwd: '.'}, reload);
});

// Less tasks
gulp.task('compile-less', ['clean'], function () {
  return gulp.src('./src/less/main.less')
    .pipe(sourcemaps.init())
    .pipe(less().on('error', console.error))
    .pipe(minifyCSS())
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest(DEST + '/css'));
});

gulp.task('clean', [], function (cb) {
  del([DEST], cb);
});

gulp.task('default', [
  'validate-js', 'test-js',
  'compile-js', 'compile-less',
  'live-server']);
