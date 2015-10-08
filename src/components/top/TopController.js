'use strict';

// @ngInject
var TopController = function ($scope, $location, NpolarApiSecurity, npolarApiConfig) {
  $scope.security = NpolarApiSecurity;
  $scope.q = $location.search().q;

  if ("production" === npolarApiConfig.environment) {
    if ("data.npolar.no" !== window.location.hostname) {
      $scope.warning = true;
    }
  }

};

module.exports = TopController;
