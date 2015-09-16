"use strict";

// @ngInject
let toolbar = function ($mdSidenav) {
    return {
      restrict: 'E',
      template: require('./toolbar.html'),
      link (scope, element, attr) {
        scope.sidenav = true;
        scope.toggleLeft = function () {
          $mdSidenav('left').toggle();
        };
      }
    };
  };

module.exports = toolbar;
