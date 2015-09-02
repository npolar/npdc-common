'use strict';

// @ngInject  
var TopController = function ($scope, $location, NpolarApiSecurity, NpdcBreadcrumbs, npolarApiConfig) {
  $scope.security = NpolarApiSecurity;
  $scope.breadcrumbs = NpdcBreadcrumbs;
  $scope.q = $location.search().q;
  
  if ("production" === npolarApiConfig.environment) {
    if ("data.npolar.no" !== window.location.hostname) {
      $scope.warning = `Running against production API ${ npolarApiConfig.base } from ${ window.location.href }`;
    }
  }
  
};

module.exports = TopController;