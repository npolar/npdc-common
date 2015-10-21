'use strict';

require('../../');
let angular = require('angular');

angular.module('expandSearchDemo', ['npdcUi']).controller('ExpandSearchDemoCtrl', function ($scope, NpdcAutocompleteConfigFactory) {
  $scope.options = {
    facets: require('../faceting/demo/facets.json').facets,
    filterUi: {
      'draft': {
        type: 'checkbox'
      },
      'year-released': {
        type: 'range'
      },
      'coverage.south': {
        type: 'range'
      }
    }
  };

  $scope.globalOptions = {
    autocomplete: new NpdcAutocompleteConfigFactory({showCollections: true})
  };

});
