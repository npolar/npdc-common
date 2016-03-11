"use strict";

let AppWrapperCtrl = function($location, $scope, npolarApiConfig, npdcAppConfig, NpolarApiSecurity, NpolarTranslate) {
  'ngInject';

  $scope.options = npdcAppConfig;

  $scope.security = NpolarApiSecurity;
  $scope.q = $location.search().q;

  if ("production" === npolarApiConfig.environment) {
    if ("app2.data.npolar.no" !== window.location.hostname) {
      $scope.warning = true;
    }
  }
};

module.exports = AppWrapperCtrl;
