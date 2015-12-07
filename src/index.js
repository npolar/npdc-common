'use strict';

let angular = require('angular');
require('angular-aria');
require('angular-animate');
require('angular-material');
require('angular-npolar');
require('jusas-angularjs-slider');
require('angular-marked');
require('angular-route');
require('formula');
require('./wrappers/filefunnel');
require('./browser-warning');

var common = angular.module('npdcCommon', ['ngRoute', 'ngNpolar', 'ngMaterial',
  'ngAnimate', 'rzModule', 'hc.marked', 'formula', 'filefunnel', 'templates']);

common.config(function($mdThemingProvider) {
  var npdcPrimary = $mdThemingProvider.extendPalette('light-blue', {
    "300": "#0f3f4c",
    "500": "#0c3642",
    "800": "#427296",
    "A100": "#ffffff",
    "contrastDefaultColor": "light",
    "contrastLightColors": ["300", "500", "800"],
  });
  var npdcAccent = $mdThemingProvider.extendPalette('green', {
    'A200': '#00963D'
  });
  $mdThemingProvider.definePalette('npdcPrimary', npdcPrimary);
  $mdThemingProvider.definePalette('npdcAccent', npdcAccent);
  $mdThemingProvider.theme('default').primaryPalette('npdcPrimary').accentPalette('npdcAccent');
  $mdThemingProvider.theme('white').primaryPalette('npdcPrimary').accentPalette('grey');
});

common.run(($http, NpolarTranslate, $templateCache) => {
  let og = $templateCache.get;
  $templateCache.get = function () {
    let o = og.apply(this, arguments);
    if (!o) {
      throw `${arguments[0]} not in templateCache!`;
    }
    return o;
  };
  // Load text dictionary
  $http.get('//api.npolar.no/text/?q=&filter-bundle=npolar|npdc&format=json&variant=array&limit=all').then(response => {
    NpolarTranslate.appendToDictionary(response.data);
  });
});

require('./components');

module.exports = {
  AutoConfig: require('./config/AutoConfig')
};
