"use strict";

var angular = require('angular');
var ui = angular.module('npdcCommon');

ui.service('NpdcSearchService', require('./searchService'));
ui.controller('NpdcFacetingCtrl', require('./faceting/FacetingCtrl'));

ui.directive('npdcFaceting', require('./faceting/facetingDirective'));
ui.directive('npdcExpandSearch', require('./expandable-search/expandSearchDirective'));

ui.directive('npdcSearch', require('./results/searchResultsDirective'));
ui.directive('npdcSearchInput', require('./input/searchInputDirective'));
ui.controller('NpdcSearchResultsController', require('./results/SearchResultsController'));
ui.factory('NpdcSearchConfigFactory', require('./SearchConfigFactory'));

ui.controller('NpdcAutocompleteController', require('./autocomplete/AutocompleteController'));
ui.factory('NpdcAutocompleteConfigFactory', require('./autocomplete/AutocompleteConfigFactory'));
ui.directive('npdcAutocomplete', require('./autocomplete/autocompleteDirective'));
