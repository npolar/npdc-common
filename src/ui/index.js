'use strict';

let angular = require('angular');
require('angular-npolar');

var ui = angular.module('npdcUi', ['npolarUi']);

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
//directive button new
//<a ng-if="security.isAuthorized('create', resource.path)" href="__new/edit"><button type="button">New</button></a>


module.exports = ui;