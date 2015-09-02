'use strict';
var fs = require('fs');

var readPackageJson = function () {
  return JSON.parse(fs.readFileSync('./package.json'), 'utf8');
};

var src = 'src',
  deps = 'node_modules',
  dist = './dist';

var config = {
  version: function () {return readPackageJson().version;},

  'dist': {
    'root': dist
  },

  'src': {
    'root': src,
    'html': [src+'/**/*.html'],
    'jsMain': src+'/index.js',
    'jsAll': [src+'/**/*.js'],
    'jsNoTests': [src+'/**/*!(Spec).js'],
    'jsDemo': src+'/**/*Demo.js',
    'sassMain': [src+'/main.scss'],
    'sassAll': [src+'/**/*.scss'],
    'img': [src+'/**/*.{ico,png,jpg,jpeg,gif}'],
    'demo': [src+'/**/*.json'],
    'views': [src+'/*/**/*(!index).html']
  },

  'deps': {
    'root': deps,
    'css' : [deps+'/angular-material/angular-material.css'],
    'views': [deps+'/angular-npolar/src/**/*.html'],
    'demo' : []
  },

  'tests': ['src/**/*Spec.js']
};

module.exports = config;
