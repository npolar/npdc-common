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
      }
    };
  };

module.exports = toolbar;
