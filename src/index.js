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
  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('amber');
});

require('./components');
require('./layouts');

module.exports = npdcMaterial;
