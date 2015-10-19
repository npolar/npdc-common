'use strict';

let angular = require('angular');
require('angular-aria');
require('angular-animate');
require('angular-material');
require('angular-npolar');
require('jusas-angularjs-slider');

var ui = angular.module('npdcUi', ['npolarUi', 'npolarApi', 'ngMaterial', 'ngAnimate', 'rzModule']);

ui.config(function($mdThemingProvider) {
  var npdcPrimary = $mdThemingProvider.extendPalette('light-blue', {
    '500': '0c3642',
    '300': '0f3f4c',
    '800': '427296',
    'A100': 'ffffff',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': ['300', '500', '800', 'A100']
  });
  console.log(npdcPrimary);
  var npdcAccent = $mdThemingProvider.extendPalette('teal', {
    'A200': 'C8FDEA'
  });
  $mdThemingProvider.definePalette('npdcPrimary', npdcPrimary);
  $mdThemingProvider.definePalette('npdcAccent', npdcAccent);
  $mdThemingProvider.theme('default').primaryPalette('npdcPrimary').accentPalette('npdcAccent', {
    'default': 'A200'
  });
  $mdThemingProvider.theme('white').primaryPalette('npdcPrimary').accentPalette('grey');
});

require('./components');
require('./layouts');

module.exports = {
  AutoConfig: require('./config/AutoConfig')
};
