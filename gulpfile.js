'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var minifyCSS = require('gulp-minify-css');
var del = require('del');
var runSequence = require('run-sequence');
var reload = browserSync.reload;

var config = {
  src: {
    root: 'src',
    js: ['node_modules/angular-material/angular-material.js', './src/**/*.js', '!./src/**/*Spec.js'],
    sass: ['./src/layout.scss','./src/components/**/*.scss']
  },
  dest: {
    root: 'dist'
  }
};

var handleError = function (err) {
  console.log(err.toString());
  this.emit('end');
};

// JavaScript tasks
gulp.task('compile-js', ['test-js'], function () {
  return gulp.src(config.src.js)
    .pipe(sourcemaps.init())
    .pipe(concat('npolar-css.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dest.root));
});

gulp.task('compile-js-min', function () {
  return gulp.src(config.src.js)
    .pipe(sourcemaps.init())
    .pipe(concat('npolar-css.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dest.root));
});

gulp.task('test-js', ['validate-js'], function () {
  return gulp.src(['./src/**/*Spec.js'])
    .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('validate-js', function () {
  return gulp.src(['./src/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Sass tasks
gulp.task('compile-sass', function () {
  return gulp.src(config.src.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', handleError))
    .pipe(concat('npolar-css.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dest.root));
});

gulp.task('compile-sass-min', function () {
  return gulp.src(config.src.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', handleError))
    .pipe(concat('npolar-css.min.css'))
    .pipe(minifyCSS())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.dest.root));
});

gulp.task('clean', function (cb) {
  del([config.dest.root], cb);
});

gulp.task('compile', ['clean'], function (cb) {
  runSequence(['compile-sass', 'compile-js'], ['compile-sass-min', 'compile-js-min'], cb);
});

// Reload
gulp.task('live-server', ['compile'], function () {
  browserSync({ server: { baseDir: '.' }});
});

// Watch
gulp.task('watch', ['live-server'], function () {
  gulp.watch(['*.html', config.dest.root + '/**/*.css', config.dest.root + '/**/*.js'], reload);
  gulp.watch(['./src/**/*.scss'], ['compile-sass', 'compile-sass-min']);
  gulp.watch(['./src/**/*.js'], ['compile-js', 'compile-js-min']);
});

gulp.task('default', ['compile', 'watch']);
