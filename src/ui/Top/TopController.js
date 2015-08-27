'use strict';

// @ngInject  
var TopController = function ($scope, $location, NpolarApiSecurity, NpdcBreadcrumbs) {
  $scope.security = NpolarApiSecurity;
  $scope.breadcrumbs = NpdcBreadcrumbs;
  $scope.q = $location.search().q;
  
};

module.exports = TopController;