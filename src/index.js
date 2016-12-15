'use strict';

let angular = require('angular');
//require('angular-animate');
require('angular-aria');
require('angular-marked');
require('angular-material');
require('angular-npolar');
require('angular-route');
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
    "contrastDefaultColor": "light",
    "contrastLightColors": ["300", "500", "800"],
  });
  var npdcButton = $mdThemingProvider.extendPalette('green', {
    'A200': '#00963D'
  });
  var npdcAccent = $mdThemingProvider.extendPalette('brown', {
    'A200': '#ffffff',
    'A700': '#ffffff',
  });
  $mdThemingProvider.definePalette('npdcPrimary', npdcPrimary);
  $mdThemingProvider.definePalette('npdcButton', npdcButton);
  $mdThemingProvider.definePalette('npdcAccent', npdcAccent);
  $mdThemingProvider.theme('default').primaryPalette('npdcPrimary').accentPalette('npdcButton');
  $mdThemingProvider.theme('white').primaryPalette('npdcPrimary').accentPalette('npdcAccent');
});


common.factory('npdcAppConfig', require('./config/npdcAppConfig'));
common.value('NpdcApplications', require('./config/npdc-applications.json'));

common.run(($http, $window, NpolarTranslate, $templateCache, NpdcApplications, NpolarLang, npdcAppConfig) => {
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
  NpolarTranslate.loadBundles(['npolar', 'npdc']);

  // Add application texts
  NpdcApplications.forEach(app => {
    NpolarTranslate.dictionary[app.link] = app.name;
    NpolarTranslate.dictionary[app.link + '.description'] = app.description;
  });

  // Set default languages
  NpolarLang.setLanguages(npdcAppConfig.i18n.languages);

  // Check if app has update and update
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
