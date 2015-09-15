'use strict';
/**
 * Angular bootstraping
 */
var angular = require('angular');
require('angular-aria');
require('angular-animate');
require('angular-material');
require('angular-npolar');

var npdcMaterial = angular.module('npdcMaterial', ['ngMaterial', 'npolarApi', 'npolarUi']);
// Don't require demo code here!

npdcMaterial.config(function($mdThemingProvider) {
  var npdcBlue = $mdThemingProvider.extendPalette('blue', {
    '500': '1570b1'
  });
  $mdThemingProvider.definePalette('npdcBlue', npdcBlue);
  $mdThemingProvider.theme('default').primaryPalette('npdcBlue').accentPalette('deep-orange');
});

require('./components');
require('./layouts');

module.exports = npdcMaterial;
