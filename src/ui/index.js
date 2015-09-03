'use strict';

let angular = require('angular');
require('angular-npolar');
require('npdc-material');

var ui = angular.module('npdcUi', ['npolarUi', 'npdcMaterial']);

ui.service('NpdcBreadcrumbs', require('./Breadcrumbs'));

ui.directive('npdcTop', require('./Top'));
ui.controller('NpdcTopController', require('./Top/TopController'));

ui.directive('npdcSearch', require('./Search'));
ui.controller('NpdcSearchController', require('./Search/SearchController'));

ui.directive('npdcCreateButton', require('./button/CreateButton'));
ui.directive('npdcEditButton', require('./button/EditButton'));
ui.directive('npdcSaveButton', require('./button/SaveButton'));
ui.directive('npdcDeleteButton', require('./button/DeleteButton'));
ui.controller('NpdcButtonComponent', require('./button/ButtonComponent'));

ui.directive('npdcFormula', require('./formula/formula.js'));
ui.directive('npdcShow', require('./formula/show.js'));

module.exports = ui;