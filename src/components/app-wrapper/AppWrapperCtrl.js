"use strict";

// @ngInject
let AppWrapperCtrl = function($location, $scope, npolarApiConfig, npdcAppConfig, NpolarApiSecurity) {
  $scope.wrapper = npdcAppConfig;

  $scope.security = NpolarApiSecurity;
  $scope.q = $location.search().q;

  if ("production" === npolarApiConfig.environment) {
    if ("data.npolar.no" !== window.location.hostname) {
      $scope.warning = true;
    }
  }
};

module.exports = AppWrapperCtrl;
