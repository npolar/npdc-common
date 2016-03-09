"use strict";

let npdcUserMenu = function(NpolarApiSecurity, NpolarLang, Gouncer) {
  'ngInject';

  return {
    scope: {},
    restrict: 'AE',
    template: require('./userMenu.html'),
    controller: 'NpolarLoginController',
    link: function(scope) {
      scope.security = NpolarApiSecurity;
      scope.lang = NpolarLang;
      scope.gouncer = Gouncer;
    }
  };
};

module.exports = npdcUserMenu;
