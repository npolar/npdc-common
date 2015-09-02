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

// layouts
require('formula');
angular.module('formula').run(function($templateCache) {
  $templateCache.put('formula/material.html', require('./layouts/formula/template.html'));
});
npdcMaterial.directive('applyMdType', require('./layouts/formula/applyMdType'));

// compontents
npdcMaterial.directive('npdcDocument', require('./components/document/document'));
npdcMaterial.directive('npdcTopMenu', require('./components/top-menu/topMenu'));
npdcMaterial.directive('npdcUserMenu', require('./components/user-menu/userMenu'));

module.exports = npdcMaterial;
