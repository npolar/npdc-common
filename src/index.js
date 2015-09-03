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
npdcMaterial.directive('applyMdType', require('./layouts/formula/applyMdType'));

// compontents
npdcMaterial.directive('npdcMdDocument', require('./components/document/document'));
npdcMaterial.directive('npdcMdTopMenu', require('./components/top-menu/topMenu'));
npdcMaterial.directive('npdcMdUserMenu', require('./components/user-menu/userMenu'));

// run block
npdcMaterial.run(function($templateCache) {
  $templateCache.put('formula/material.html', require('./layouts/formula/template.html'));
});

module.exports = npdcMaterial;
