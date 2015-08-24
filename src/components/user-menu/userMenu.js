"use strict";

var angular = require('angular');

angular.module('npdcMaterial')
  .directive('npdcUserMenu', function(NpolarApiSecurity) {
    return {
      restrict: 'AE',
      template: require('./userMenu.html'),
      controller: 'NpolarLoginController',
      link: function(scope) {
        scope.user = NpolarApiSecurity.getUser();
      }
    };
  });
