'use strict';

require('../../');
let angular = require('angular');
require('angular-npolar');

let demo = angular.module('faceting', ['npdcMaterial', 'npolarApi']);

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

  $scope.query = function(params) {

    let defaults = { limit: "all", sort: "-updated", fields: 'title,id,updated' };
    let invariants = $scope.security.isAuthenticated() ? {} : { "not-draft": "yes" } ;

    return angular.extend(defaults, $location.search(), invariants, params);
  };

  $scope.search($scope.query());

  $scope.facetOptions = {
    'draft': {
      type: 'checkbox'
    },
    'year-released': {
      type: 'range'
    }
  };

  $scope.$on('search-change', (e, q) => {
    $scope.search($scope.query(q));
  });
});
