"use strict";

var angular = require('angular');
var npdcMaterial = angular.module('npdcMaterial');

npdcMaterial.directive('npdcMdDocument', require('./document/document'));
npdcMaterial.directive('npdcMdToolbar', require('./toolbar/toolbar'));
npdcMaterial.directive('npdcMdUserMenu', require('./user-menu/userMenu'));
npdcMaterial.directive('npdcMdExpandSearch', require('./expandable-search/expandSearch'));
