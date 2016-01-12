"use strict";

var angular = require('angular');
var common = angular.module('npdcCommon');
require('./search');
require('./document');
require('./formula');

common.service('recursionService', require('./recursionService'));
common.directive('ngFocusOut', require('./focusOutDirective'));
common.factory('npdcAppConfig', require('./app/npdcAppConfig'));

common.directive('npdcToolbar', require('./toolbar/toolbarDirective'));
common.directive('npdcUserMenu', require('./user-menu/userMenu'));

common.service('NpdcBreadcrumbs', require('./breadcrumbs/BreadcrumbsService'));
common.controller('NpdcBreadcrumbsController', require('./breadcrumbs/BreadcrumbsController'));
common.directive('npdcCrumbs', require('./breadcrumbs/breadcrumbsDirective'));

common.directive('npdcBottom', require('./bottom/bottom'));
common.controller('NpdcBottomController', require('./bottom/BottomController'));

common.directive('npdcCreateButton', require('./button/CreateButton'));
common.directive('npdcEditButton', require('./button/EditButton'));
common.directive('npdcSaveButton', require('./button/SaveButton'));
common.directive('npdcDeleteButton', require('./button/DeleteButton'));
common.controller('NpdcButtonComponent', require('./button/ButtonComponent'));


common.controller('NpdcAppController', require('./app/AppController'));
common.directive('npdcApp', require('./app/appDirective'));

common.controller('NpdcBottomSheetController', require('./bottom-sheet/BottomSheetController'));
common.directive('npdcBottomSheet', require('./bottom-sheet/bottomSheetDirective'));

common.directive('npdcLoader', require('./loader/loaderDirective'));
common.directive('npdcFooter', require('./footer/footerDirective'));
