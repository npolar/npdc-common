'use strict';

require('../../');
let angular = require('angular');
require('angular-npolar');

let demo = angular.module('faceting', ['npdcUi', 'npolarApi']);

// Bootstrap ngResource models using NpolarApiResource
var resource = {'path': '/dataset', 'resource': 'Dataset' };
demo.factory(resource.resource, ['NpolarApiResource', function (NpolarApiResource) {
  return NpolarApiResource.resource(resource);
}]);

// API HTTP interceptor
demo.config($httpProvider => {
  $httpProvider.interceptors.push('npolarApiInterceptor');
});

// Inject npolarApiConfig and run
demo.run(npolarApiConfig => {
  angular.extend(npolarApiConfig, { resources: [resource] });
});

demo.controller('FacetingDemoCtrl', function ($scope, $location, $controller, Dataset) {

  $controller('NpolarBaseController', { $scope: $scope });
  $scope.resource = Dataset;
  $scope.filterCount = 0;

  $scope.query = function(params) {

    let defaults = { limit: "all", sort: "-updated", fields: 'title,id,updated', facets: 'coverage.south,people.email,progress,topics,draft' };
    let invariants = {};

    return angular.extend(defaults, invariants, params);
  };

  $scope.search($scope.query()).$promise.then((data) => {
    $scope.options.facets = data.feed.facets;
  });

  $scope.options = {
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

});
