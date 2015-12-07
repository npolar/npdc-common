'use strict';

require('../../');
let angular = require('angular');
require('angular-npolar');
require('angular-route');

let demo = angular.module('faceting', ['ngRoute', 'npdcCommon', 'npolarApi']);

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

// Routing
demo.config(function ($routeProvider) {
  $routeProvider.otherwise({
    templateUrl: 'demo.tmpl',
    controller: 'FacetingDemoCtrl',
    reloadOnSearch: false
  });
});

demo.controller('FacetingDemoCtrl', function ($scope, $location, $controller, Dataset, npdcAppConfig, NpdcSearchService) {

  $controller('NpolarBaseController', { $scope: $scope });
  $scope.resource = Dataset;
  $scope.options = npdcAppConfig.search.local;
  $scope.q = $location.search().q;

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

  $scope.$watch('q', (newVal, oldVal) => {
    if (newVal !== oldVal) {
      let query = Object.assign({},
        $location.search(),
        {q: newVal});
      NpdcSearchService.search(query);
    }
  });

});
