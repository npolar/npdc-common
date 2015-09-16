"use strict";

// @ngInject
let ToolbarCtrl = function ($scope, $mdSidenav) {
  $scope.sidenav = $scope.toolbar.sidenav || true;
  $scope.title = $scope.toolbar.title || '';
  $scope.toggleLeft = function () {
    $mdSidenav('left').toggle();
  };
};

module.exports = ToolbarCtrl;
