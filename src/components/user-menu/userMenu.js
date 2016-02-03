"use strict";

let npdcUserMenu = function(NpolarApiSecurity, NpolarLang) {
  'ngInject';

  return {
    scope: {},
    restrict: 'AE',
    template: require('./userMenu.html'),
    controller: 'NpolarLoginController',
    link: function(scope) {
      scope.security = NpolarApiSecurity;
      scope.lang = NpolarLang;
    }
  };
};

module.exports = npdcUserMenu;
