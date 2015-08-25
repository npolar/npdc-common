'use strict';

// @ngInject
var TopController = function ($scope, NpolarApiSecurity, NpdcBreadcrumbs) {
  $scope.security = NpolarApiSecurity;
  $scope.breadcrumbs = NpdcBreadcrumbs;
};

module.exports = TopController;