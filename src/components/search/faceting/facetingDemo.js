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

demo.controller('FacetingDemoCtrl', function ($scope, $location, $controller, Dataset, npdcAppConfig) {

  $controller('NpolarBaseController', { $scope: $scope });
  $scope.resource = Dataset;
  $scope.options = npdcAppConfig.search;

  let defaults = { limit: "50", sort: "-updated,-released", fields: 'title,id,collection,updated', facets: "topics", score: true };
  let invariants = $scope.security.isAuthenticated() ? {} : { "not-draft": "yes", "not-progress": "planned", "filter-links.rel": "data" };
  let query = Object.assign({}, defaults, invariants);

  let search = function (q) {
    $scope.search(Object.assign({}, query, q));
  };

  search(query);

  $scope.$on('$locationChangeSuccess', (event, data) => {
    search($location.search());
  });

});
