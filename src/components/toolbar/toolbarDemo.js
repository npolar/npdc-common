'use strict';

require('../../');
let angular = require('angular');

angular.module('toolbar', ['npdcUi']).controller('ToolbarCtrl', function($scope, npdcAppConfig) {
  $scope.options = npdcAppConfig;
  $scope.options.search = {
    facets: require('../faceting/demo/facets.json').facets,
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
  $scope.options.onSearch = function (a) {
    console.log(a);
  };
});
