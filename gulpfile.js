'use strict';

var fs = require('fs');
var path = require('path');
var tasks = fs.readdirSync(path.resolve(__dirname, './tasks/'))
  .filter(function (name) { return /(\.(js)$)/i.test(path.extname(name));});
var config = require('./config');
var gulp = require('gulp');

tasks.forEach(function(task) {
  require('./tasks/' + task)(gulp, config);
});

gulp.task('default', ['dev']);
