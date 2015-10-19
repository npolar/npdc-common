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
    "300": "#0f3f4c",
    "500": "#0c3642",
    "800": "#427296",
    "A100": "#ffffff",
    "contrastDefaultColor": "light",
    "contrastLightColors": ["300", "500", "800"],
  });
  console.log(JSON.stringify(npdcPrimary));
  var npdcAccent = $mdThemingProvider.extendPalette('teal', {});
  console.log(JSON.stringify(npdcAccent));
  $mdThemingProvider.definePalette('npdcPrimary', npdcPrimary);
  $mdThemingProvider.definePalette('npdcAccent', npdcAccent);
  $mdThemingProvider.theme('default').primaryPalette('npdcPrimary').accentPalette('npdcAccent');
  $mdThemingProvider.theme('white').primaryPalette('npdcPrimary').accentPalette('grey');
});

require('./components');
require('./layouts');

module.exports = {
  AutoConfig: require('./config/AutoConfig')
};
