'use strict';

let angular = require('angular');
require('angular-aria');
require('angular-animate');
require('angular-material');
require('angular-npolar');
require('jusas-angularjs-slider');

var ui = angular.module('npdcUi', ['npolarUi', 'npolarApi', 'ngMaterial', 'rzModule']);

ui.config(function($mdThemingProvider) {
  var npdcBlue = $mdThemingProvider.extendPalette('blue', {
    '500': '1570b1'
  });
  $mdThemingProvider.definePalette('npdcBlue', npdcBlue);
  $mdThemingProvider.theme('default').primaryPalette('npdcBlue').accentPalette('deep-orange');
});

require('./components');
require('./layouts');

module.exports = {
  AutoConfig: require('./config/AutoConfig')
};
