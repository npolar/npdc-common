"use strict";

let AppWrapperCtrl = function($location, $scope, npolarApiConfig, npdcAppConfig, NpolarApiSecurity, NpolarTranslate) {
  'ngInject';

  const APP_TITLE_CODE = 'npdc.app.Title';

  $scope.options = npdcAppConfig;

  $scope.security = NpolarApiSecurity;
  $scope.q = $location.search().q;
  $scope.cardTitle = function () {
    var i18nTitle = NpolarTranslate.translate(npdcAppConfig.cardTitle);
    return i18nTitle === APP_TITLE_CODE ? npdcAppConfig.toolbarTitle : i18nTitle;
  };

  if ("production" === npolarApiConfig.environment) {
    if ("data.npolar.no" !== window.location.hostname) {
      $scope.warning = true;
    }
  }
};

module.exports = AppWrapperCtrl;
