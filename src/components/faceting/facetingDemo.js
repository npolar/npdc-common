'use strict';

require('../../');
let angular = require('angular');
require('angular-route');

angular.module('faceting', ['npdcMaterial']).controller('FacetingCtrl', function ($scope) {
  $scope.facets = require('./demo/facets.json');
  $scope.facets.options = {
    'draft': {
      type: 'checkbox'
    },
    'year-released': {
      type: 'range'
    }
  };
});
