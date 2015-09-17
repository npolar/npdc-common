'use strict';

let angular = require('angular');
require('angular-npolar');
require('npdc-material');

var ui = angular.module('npdcUi', ['npolarUi', 'npdcMaterial']);

ui.service('NpdcBreadcrumbs', require('./breadcrumbs/BreadcrumbsService'));
ui.controller('NpdcBreadcrumbsController', require('./breadcrumbs/BreadcrumbsController'));
ui.directive('npdcCrumbs', require('./breadcrumbs/breadcrumbsDirective'));

ui.directive('npdcTop', require('./top/top'));
ui.controller('NpdcTopController', require('./top/TopController'));

ui.directive('npdcSearch', require('./search/search'));
ui.controller('NpdcSearchController', require('./search/SearchController'));

ui.directive('npdcBottom', require('./bottom/bottom'));
ui.controller('NpdcBottomController', require('./bottom/BottomController'));

//ui.controller('NpdcAutocompleteController', require('./search/AutocompleteController'));

ui.directive('npdcCreateButton', require('./button/CreateButton'));
ui.directive('npdcEditButton', require('./button/EditButton'));
ui.directive('npdcSaveButton', require('./button/SaveButton'));
ui.directive('npdcDeleteButton', require('./button/DeleteButton'));
ui.controller('NpdcButtonComponent', require('./button/ButtonComponent'));

ui.directive('npdcFormula', require('./formula/formula.js'));
ui.directive('npdcShow', require('./formula/show.js'));

module.exports = ui;
