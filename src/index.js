'use strict';

let angular = require('angular');
require('angular-animate');
require('angular-aria');
require('angular-marked');
require('angular-material');
require('angular-npolar');
require('angular-route');
require('angular-sanitize');
require('formula');
require('jusas-angularjs-slider');
require('./browser-warning');
require('./wrappers/chronopic');
require('./wrappers/filefunnel');

var common = angular.module('npdcCommon', [
  'chronopic',
  'filefunnel',
  'formula',
  'hc.marked',
  'ngAnimate',
  'ngMaterial',
  'ngNpolar',
  'ngRoute',
  'rzModule',
  'templates'
]);

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
