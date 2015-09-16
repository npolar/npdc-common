"use strict";

// @ngInject
let SidenavCtrl = function ($scope, $mdSidenav) {
  $scope.close = function () {
    $mdSidenav('left').toggle();
  };
};

module.exports = SidenavCtrl;
