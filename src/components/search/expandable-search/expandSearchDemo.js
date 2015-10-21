'use strict';

require('../../');
let angular = require('angular');

angular.module('expandSearchDemo', ['npdcUi']).controller('ExpandSearchDemoCtrl', function ($scope, NpdcAutocompleteConfig) {
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
    },
    collections: ['dataset'],
    placeholder: 'Dataset'
  };

  NpdcAutocompleteConfig.showCollections = true;
});
