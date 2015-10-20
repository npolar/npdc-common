"use strict";

var angular = require('angular');
var ui = angular.module('npdcUi');
require('./search');

ui.directive('ngFocusOut', require('./focusOutDirective'));
ui.value('npdcAppConfig', require('./app-wrapper/npdcAppConfig'));

ui.directive('npdcDocument', require('./document/document'));
ui.directive('npdcToolbar', require('./toolbar/toolbarDirective'));
ui.directive('npdcFaceting', require('./faceting/facetingDirective'));
ui.directive('npdcUserMenu', require('./user-menu/userMenu'));

ui.service('NpdcBreadcrumbs', require('./breadcrumbs/BreadcrumbsService'));
ui.controller('NpdcBreadcrumbsController', require('./breadcrumbs/BreadcrumbsController'));
ui.directive('npdcCrumbs', require('./breadcrumbs/breadcrumbsDirective'));

ui.directive('npdcBottom', require('./bottom/bottom'));
ui.controller('NpdcBottomController', require('./bottom/BottomController'));

ui.directive('npdcCreateButton', require('./button/CreateButton'));
ui.directive('npdcEditButton', require('./button/EditButton'));
ui.directive('npdcSaveButton', require('./button/SaveButton'));
ui.directive('npdcDeleteButton', require('./button/DeleteButton'));
ui.controller('NpdcButtonComponent', require('./button/ButtonComponent'));

ui.directive('npdcFormula', require('./formula/formula'));
ui.directive('npdcShow', require('./document/document'));

ui.controller('NpdcAppWrapperCtrl', require('./app-wrapper/AppWrapperCtrl'));
ui.directive('npdcApp', require('./app-wrapper/appWrapper'));
