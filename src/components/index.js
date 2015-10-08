"use strict";

var angular = require('angular');
var ui = angular.module('npdcUi');

ui.controller('NpdcMdSidenavCtrl', require('./sidenav/SidenavCtrl'));
ui.controller('NpdcMdToolbarCtrl', require('./toolbar/ToolbarCtrl'));
ui.controller('NpdcMdFacetingCtrl', require('./faceting/FacetingCtrl'));

ui.directive('npdcMdDocument', require('./document/document'));
ui.directive('npdcMdSidenav', require('./sidenav/sidenav'));
ui.directive('npdcMdToolbar', require('./toolbar/toolbar'));
ui.directive('npdcMdFaceting', require('./faceting/facetingDirective'));
ui.directive('npdcMdUserMenu', require('./user-menu/userMenu'));
ui.directive('npdcMdExpandSearch', require('./expandable-search/expandSearch'));

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
