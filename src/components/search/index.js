"use strict";

var angular = require('angular');
var ui = angular.module('npdcUi');

ui.service('NpdcSearchService', require('./searchService'));
ui.controller('NpdcFacetingCtrl', require('./faceting/FacetingCtrl'));

ui.directive('npdcFaceting', require('./faceting/facetingDirective'));
ui.directive('npdcExpandSearch', require('./expandable-search/expandSearchDirective'));

ui.directive('npdcSearch', require('./searchDirective'));
ui.controller('NpdcSearchController', require('./SearchController'));

ui.controller('NpdcAutocompleteController', require('./autocomplete/AutocompleteController'));
ui.factory('NpdcAutocompleteConfigFactory', require('./autocomplete/AutocompleteConfigFactory'));
ui.directive('npdcAutocomplete', require('./autocomplete/autocompleteDirective'));
