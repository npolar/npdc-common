"use strict";

// @ngInject
let ToolbarCtrl = function ($scope, $mdSidenav) {
  if ($scope.toolbar) {
    $scope.sidenav = $scope.toolbar.sidenav;
    $scope.title = $scope.toolbar.title;
  }
  $scope.toggleLeft = function () {
    $mdSidenav('left').toggle();
  };
};

module.exports = ToolbarCtrl;
