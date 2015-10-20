'use strict';

require('../../');
let angular = require('angular');

angular.module('toolbar', ['npdcUi']).controller('ToolbarCtrl', function($scope, npdcAppConfig) {
  $scope.options = npdcAppConfig;
  $scope.options.search = {
    facets: require('../search/faceting/demo/facets.json').facets,
    filterOptions: {
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
});
