'use strict';
/**
 * Angular bootstraping
 */
var angular = require('angular');
require('angular-aria');
require('angular-animate');
require('angular-material');
console.log((() => "foobar0")());
require('angular-npolar');
require('test');
var npdcMaterial = angular.module('npdcMaterial', ['ngMaterial', 'ngNpolar']);
// Don't require demo code here!

// layouts
npdcMaterial.directive('applyMdType', require('./layouts/formula/applyMdType'));


// compontents
npdcMaterial.directive('npdcDocument', require('./components/document/document'));
npdcMaterial.directive('npdcTopMenu', require('./components/top-menu/topMenu'));
npdcMaterial.directive('npdcUserMenu', require('./components/user-menu/userMenu'));

module.exports = npdcMaterial;
