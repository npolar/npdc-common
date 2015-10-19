"use strict";

// @ngInject
let npdcUserMenu = function(NpolarApiSecurity) {
  return {
    scope: {},
    restrict: 'AE',
    template: require('./userMenu.html'),
    controller: 'NpolarLoginController',
    link: function(scope) {
      scope.user = NpolarApiSecurity.getUser();
      //scope.gouncer = Gouncer;
    }
  };
};

module.exports = npdcUserMenu;
