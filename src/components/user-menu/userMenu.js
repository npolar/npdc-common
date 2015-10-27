"use strict";

// @ngInject
let npdcUserMenu = function(NpolarApiSecurity) {
  return {
    scope: {},
    restrict: 'AE',
    template: require('./userMenu.html'),
    controller: 'NpolarLoginController',
    link: function(scope) {
      scope.security = NpolarApiSecurity;
    }
  };
};

module.exports = npdcUserMenu;
