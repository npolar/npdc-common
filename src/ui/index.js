'use strict';

let angular = require('angular');
require('angular-npolar');

var ui = angular.module('npdcUi', ['npolarUi']);

ui.service('NpdcBreadcrumbs', require('./Breadcrumbs'));

ui.directive('npdcTop', require('./Top'));
ui.controller('NpdcTopController', require('./Top/TopController'));

ui.directive('npdcSearch', require('./Search'));
ui.controller('NpdcSearchController', require('./Search/SearchController'));

module.exports = ui;