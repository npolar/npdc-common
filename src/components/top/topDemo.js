'use strict';

require('../../');
let angular = require('angular');

angular.module('topDemo', ['npdcUi', 'templates']).controller('TopDemoCtrl', function ($scope) {
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
