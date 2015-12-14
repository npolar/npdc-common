"use strict";

var angular = require('angular');
var ui = angular.module('npdcCommon');
require('./search');
require('./document');

ui.directive('ngFocusOut', require('./focusOutDirective'));
ui.factory('npdcAppConfig', require('./app/npdcAppConfig'));

ui.directive('npdcToolbar', require('./toolbar/toolbarDirective'));
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


ui.controller('NpdcAppController', require('./app/AppController'));
ui.directive('npdcApp', require('./app/appDirective'));

ui.controller('NpdcBottomSheetController', require('./bottom-sheet/BottomSheetController'));
ui.directive('npdcBottomSheet', require('./bottom-sheet/bottomSheetDirective'));

ui.directive('npdcLoader', require('./loader/loaderDirective'));
ui.directive('npdcFooter', require('./footer/footerDirective'));

ui.directive('npdcFormula', require('./formula/formulaDirective'));
ui.directive('initMdField', require('./formula/initMdFieldDirective'));

ui.run(function($templateCache) {
  $templateCache.put('formula/material.html', require('./formula/template.html'));
});
