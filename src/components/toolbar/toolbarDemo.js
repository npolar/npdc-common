'use strict';

require('../../');
let angular = require('angular');

angular.module('toolbar', ['npdcUi']).controller('ToolbarCtrl', function ($scope) {
  $scope.feed = require('../faceting/demo/facets.json');
  $scope.myToolbar = {
    title: 'Appname',
    sidenav: true,
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
    },
    facets: $scope.feed.facets
  };
});
