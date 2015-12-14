"use strict";

// @ngInject
let toolbar = function($mdSidenav, NpolarApiSecurity, NpolarTranslate) {
  const APP_TITLE_CODE = 'npdc.app.Title';
  const SITE_TITLE_CODE = 'NPDC';

  return {
    restrict: 'E',
    scope: {
      options: '='
    },
    template: require('./toolbar.html'),
    link: function(scope) {
      scope.security = NpolarApiSecurity;
    },
    //@ngInject
    controller: function($scope, npdcAppConfig) {
      $scope.options = $scope.options || npdcAppConfig;

      $scope.appTitle = function() {
        var i18nTitle = NpolarTranslate.translate(APP_TITLE_CODE);
        return i18nTitle === APP_TITLE_CODE ? $scope.options.toolbarTitle : i18nTitle;
      };

      $scope.siteTitle = function() {
        var i18nTitle = NpolarTranslate.translate(SITE_TITLE_CODE);
        return i18nTitle === SITE_TITLE_CODE ? 'Norwegian Polar Data Centre' : i18nTitle;
      };
    }
  };
};

module.exports = toolbar;
