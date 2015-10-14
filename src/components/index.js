"use strict";

var angular = require('angular');
var ui = angular.module('npdcUi');

ui.directive('ngFocusOut', require('./focusOutDirective'));
ui.value('npdcAppConfig', require('./app-wrapper/npdcAppConfig'));

ui.controller('NpdcSidenavCtrl', require('./sidenav/SidenavCtrl'));
ui.controller('NpdcToolbarCtrl', require('./toolbar/ToolbarCtrl'));
ui.service('NpdcFacetingService', require('./faceting/facetingService'));
ui.controller('NpdcFacetingCtrl', require('./faceting/FacetingCtrl'));

ui.directive('npdcDocument', require('./document/document'));
ui.directive('npdcSidenav', require('./sidenav/sidenav'));
ui.directive('npdcToolbar', require('./toolbar/toolbar'));
ui.directive('npdcFaceting', require('./faceting/facetingDirective'));
ui.directive('npdcUserMenu', require('./user-menu/userMenu'));
ui.directive('npdcExpandSearch', require('./expandable-search/expandSearch'));

ui.service('NpdcBreadcrumbs', require('./breadcrumbs/BreadcrumbsService'));
ui.controller('NpdcBreadcrumbsController', require('./breadcrumbs/BreadcrumbsController'));
ui.directive('npdcCrumbs', require('./breadcrumbs/breadcrumbsDirective'));

ui.directive('npdcTop', require('./top/top'));
ui.controller('NpdcTopController', require('./top/TopController'));

ui.directive('npdcSearch', require('./search/search'));
ui.controller('NpdcSearchController', require('./search/SearchController'));

ui.directive('npdcBottom', require('./bottom/bottom'));
ui.controller('NpdcBottomController', require('./bottom/BottomController'));

ui.controller('NpdcAutocompleteController', require('./search/autocomplete/AutocompleteController'));
ui.service('NpdcAutocompleteConfig', require('./search/autocomplete/autocompleteConfigService'));
ui.directive('npdcAutocomplete', require('./search/autocomplete/autocompleteDirective'));

ui.directive('npdcCreateButton', require('./button/CreateButton'));
ui.directive('npdcEditButton', require('./button/EditButton'));
ui.directive('npdcSaveButton', require('./button/SaveButton'));
ui.directive('npdcDeleteButton', require('./button/DeleteButton'));
ui.controller('NpdcButtonComponent', require('./button/ButtonComponent'));

ui.directive('npdcFormula', require('./formula/formula.js'));
ui.directive('npdcShow', require('./formula/show.js'));

ui.controller('NpdcAppWrapperCtrl', require('./app-wrapper/AppWrapperCtrl'));
ui.directive('npdcApp', require('./app-wrapper/appWrapper'));
