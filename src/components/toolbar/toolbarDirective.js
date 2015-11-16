"use strict";

// @ngInject
let toolbar = function ($mdSidenav, NpolarApiSecurity) {
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
      }
    };
  };

module.exports = toolbar;
