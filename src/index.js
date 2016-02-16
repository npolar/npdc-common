'use strict';

let angular = require('angular');
//require('angular-animate');
require('angular-aria');
require('angular-marked');
require('angular-material');
require('angular-npolar');
require('angular-route');
require('angular-contenteditable');
require('formula');
require('angularjs-slider');
//require('./browser-warning');
require('./wrappers/chronopic');
require('./wrappers/filefunnel');

var common = angular.module('npdcCommon', [
  'chronopic',
  'filefunnel',
  'formula',
  'hc.marked',
  //'ngAnimate',
  'ngMaterial',
  'ngNpolar',
  'ngRoute',
  'contenteditable',
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

common.factory('npdcAppConfig', require('./config/npdcAppConfig'));
common.value('NpdcApplications', require('./config/npdc-applications.json'));

common.run(($http, $window, NpolarTranslate, $templateCache) => {
  // Convenience for debugging missing templates
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

  // Check if app has update anf update
  if (window.applicationCache) {
    applicationCache.addEventListener('updateready', function() {
      $window.location.reload();
    });
  }
});

require('./components');

module.exports = {
  AutoConfig: require('./config/AutoConfig')
};
