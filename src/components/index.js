"use strict";

var angular = require('angular');
var npdcMaterial = angular.module('npdcMaterial');

npdcMaterial.controller('NpdcMdSidenavCtrl', require('./sidenav/SidenavCtrl'));
npdcMaterial.controller('NpdcMdToolbarCtrl', require('./toolbar/ToolbarCtrl'));

npdcMaterial.directive('npdcMdDocument', require('./document/document'));
npdcMaterial.directive('npdcMdToolbar', require('./toolbar/toolbar'));
npdcMaterial.directive('npdcMdSidenav', require('./sidenav/sidenav'));
npdcMaterial.directive('npdcMdUserMenu', require('./user-menu/userMenu'));
npdcMaterial.directive('npdcMdExpandSearch', require('./expandable-search/expandSearch'));
