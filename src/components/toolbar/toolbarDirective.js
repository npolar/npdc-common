"use strict";

let toolbar = function($mdSidenav, NpolarApiSecurity, NpolarTranslate) {
  'ngInject';

  const APP_TITLE_CODE = 'npdc.app.Title';
  const SITE_TITLE_CODE = 'NPDC';

  return {
    restrict: 'E',
    scope: {
      options: '=?'
    },
    template: require('./toolbar.html'),
    link: function(scope) {
      scope.security = NpolarApiSecurity;
    },
    controller: function($scope, npdcAppConfig) {
      'ngInject';

      $scope.options = $scope.options || npdcAppConfig;

      $scope.appTitle = function() {
        var i18nTitle = NpolarTranslate.translate(APP_TITLE_CODE);
        return i18nTitle === APP_TITLE_CODE ? $scope.options.toolbarTitle : i18nTitle;
      };

      $scope.siteTitle = function() {
        var i18nTitle = NpolarTranslate.translate(SITE_TITLE_CODE);
        return i18nTitle === SITE_TITLE_CODE ? 'Norwegian Polar Data Centre' : i18nTitle;
      };

      $scope.icon48 = function (app) {
        return app.icons.find(icon => icon.size === 48).src;
      };
    }
  };
};

module.exports = toolbar;
