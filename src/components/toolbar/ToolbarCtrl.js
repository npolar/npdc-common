"use strict";

// @ngInject
let ToolbarCtrl = function ($scope, $mdSidenav, NpdcFacetingService) {
  if ($scope.toolbar) {
    $scope.sidenav = $scope.toolbar.sidenav;
    $scope.title = $scope.toolbar.title;
    $scope.facets = $scope.toolbar.facets;
    $scope.filterOptions = $scope.toolbar.filterOptions;
  }
  $scope.toggleLeft = function () {
    $mdSidenav('left').toggle();
  };
  $scope.filterIcon = null;

  NpdcFacetingService.on('search-change', function (event, data) {
    if (data.count > 0 && data.count < 10) {
      $scope.filterIcon = 'filter_' + data.count;
    } else if (data.count >= 10) {
      $scope.filterIcon = 'filter_9_plus';
    } else {
      $scope.filterIcon = null;
    }
  });
};

module.exports = ToolbarCtrl;
