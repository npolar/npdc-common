"use strict";

var angular = require('angular');
var ui = angular.module('npdcUi');

ui.service('NpdcFacetingService', require('./faceting/facetingService'));
ui.controller('NpdcFacetingCtrl', require('./faceting/FacetingCtrl'));

ui.directive('npdcFaceting', require('./faceting/facetingDirective'));
ui.directive('npdcExpandSearch', require('./expandable-search/expandSearchDirective'));

ui.directive('npdcSearch', require('./searchDirective'));
ui.controller('NpdcSearchController', require('./SearchController'));

ui.controller('NpdcAutocompleteController', require('./autocomplete/AutocompleteController'));
ui.service('NpdcAutocompleteConfig', require('./autocomplete/autocompleteConfigService'));
ui.directive('npdcAutocomplete', require('./autocomplete/autocompleteDirective'));
