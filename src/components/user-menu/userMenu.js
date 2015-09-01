"use strict"; 

// @ngInject
let npdcUserMenu = function(NpolarApiSecurity) {
  return {
    restrict: 'AE',
    template: require('./userMenu.html'),
    controller: 'NpolarLoginController',
    link: function(scope) {
      scope.user = NpolarApiSecurity.getUser();
    }
  };
};

module.exports = npdcUserMenu;
